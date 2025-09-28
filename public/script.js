// Function to switch between different page sections
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Global variable to store current user's account type
let currentAccountType = null;
let currentUserId = null;

// Handle user authentication state changes
auth.onAuthStateChanged(async user => {
    if (user) {
        // User is signed in
        currentUserId = user.uid;
        document.getElementById('auth-button').style.display = 'none';
        document.getElementById('profile-button').style.display = 'inline-block';
        showPage('videos-section');

        // Fetch user data from Firestore to get account type
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            currentAccountType = userDoc.data().accountType;
        }

        // Show/hide UI elements based on account type
        if (currentAccountType === 'business') {
            document.getElementById('videos-section').style.display = 'none';
            document.getElementById('profile-button').onclick = () => {
                showPage('profile-section');
                document.getElementById('business-content').style.display = 'block';
                document.getElementById('user-content').style.display = 'none';
            };
        } else {
            // It's a regular user
            document.getElementById('profile-button').onclick = () => {
                showPage('profile-section');
                document.getElementById('business-content').style.display = 'none';
                document.getElementById('user-content').style.display = 'block';
                fetchOrderHistory();
            };
        }

        fetchVideos();

    } else {
        // User is signed out
        currentUserId = null;
        currentAccountType = null;
        document.getElementById('auth-button').style.display = 'inline-block';
        document.getElementById('profile-button').style.display = 'none';
        showPage('auth-section');
    }
});

// Event listener for the main login/signup form
document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    const submitButton = document.getElementById('auth-submit-btn');
    const isLoginMode = submitButton.textContent === 'Login';

    try {
        if (isLoginMode) {
            // Login mode
            await auth.signInWithEmailAndPassword(email, password);
            console.log("Logged in successfully!");
        } else {
            // Sign up mode
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            await db.collection('users').doc(userId).set({
                email,
                accountType,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Signed up successfully!");
        }
    } catch (error) {
        alert(error.message);
    }
});

// Switch between login and signup modes
document.getElementById('switch-auth-mode-btn').addEventListener('click', () => {
    const submitButton = document.getElementById('auth-submit-btn');
    const switchButton = document.getElementById('switch-auth-mode-btn');

    if (submitButton.textContent === 'Login') {
        submitButton.textContent = 'Sign Up';
        switchButton.textContent = 'Already have an account? Login';
    } else {
        submitButton.textContent = 'Login';
        switchButton.textContent = 'Don\'t have an account? Sign Up';
    }
});

// Fetch videos from Firestore and display them
async function fetchVideos() {
    const videoFeed = document.getElementById('video-feed');
    videoFeed.innerHTML = ''; // Clear existing videos

    // Fetch all videos, ordered by creation date
    const snapshot = await db.collection('videos').orderBy('createdAt', 'desc').get();
    
    if (snapshot.empty) {
        videoFeed.innerHTML = '<p>No videos available yet. Check back soon!</p>';
        return;
    }

    snapshot.forEach(doc => {
        const video = doc.data();
        const videoId = doc.id;
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <video src="${video.videoUrl}" controls muted loop></video>
            <div class="video-info">
                <h3>${video.restaurantName}</h3>
                <p>${video.description}</p>
                <div class="video-tags">
                    ${video.tags.map(tag => `<span>#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="video-actions">
                <button class="like-btn" data-id="${videoId}">❤️</button>
            </div>
            <button class="order-btn" data-id="${videoId}">Order Now</button>
        `;
        videoFeed.appendChild(videoCard);
    });

    // Add event listeners for the new buttons
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', (e) => openOrderModal(e.target.dataset.id));
    });

    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const videoId = e.target.dataset.id;
            const videoRef = db.collection('videos').doc(videoId);
            await videoRef.update({
                likes: firebase.firestore.FieldValue.increment(1)
            });
            e.target.classList.add('liked');
            console.log('Video liked!');
        });
    });
}

// Function to handle video uploads by business users
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const videoFile = document.getElementById('video-file').files[0];
    const restaurantName = document.getElementById('restaurant-name').value;
    const description = document.getElementById('video-description').value;
    const tags = document.getElementById('video-tags').value.split(',').map(tag => tag.trim());

    if (!videoFile) {
        alert("Please select a video file.");
        return;
    }

    // Upload video to Firebase Storage
    const storageRef = storage.ref(`videos/${currentUserId}/${videoFile.name}`);
    const uploadTask = storageRef.put(videoFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Progress monitoring can be added here
        },
        (error) => {
            alert("Upload failed: " + error.message);
        },
        async () => {
            // Upload complete, get the download URL
            const videoUrl = await uploadTask.snapshot.ref.getDownloadURL();

            // Save video metadata to Firestore
            await db.collection('videos').add({
                videoUrl,
                restaurantName,
                description,
                tags,
                likes: 0,
                uploaderId: currentUserId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert("Video uploaded and saved!");
            document.getElementById('upload-form').reset();
        }
    );
});

// Order Flow Functions

let currentOrderVideoId = null;

function openOrderModal(videoId) {
    currentOrderVideoId = videoId;
    document.getElementById('order-modal').style.display = 'block';
}

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});

// Handle order submission
document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const quantity = document.getElementById('order-quantity').value;
    const addOns = Array.from(document.getElementById('add-ons').selectedOptions).map(opt => opt.value);
    const paymentMethod = document.getElementById('payment-method').value;

    if (!currentUserId) {
        alert("Please log in to place an order.");
        return;
    }

    // Simulate payment and save order to Firestore
    alert(`Payment of ${quantity} items via ${paymentMethod} is simulated.`);
    
    await db.collection('orders').add({
        userId: currentUserId,
        videoId: currentOrderVideoId,
        quantity: parseInt(quantity),
        addOns: addOns,
        paymentMethod: paymentMethod,
        status: 'Preparing',
        orderDate: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById('order-modal').style.display = 'none';
    alert("Order confirmed! Simulating status updates...");

    // Simulate status updates (in a real app, this would be a server function)
    const orderRef = db.collection('orders').doc(); // This would be the actual order doc
    setTimeout(async () => {
        await orderRef.update({ status: 'On the Way' });
        console.log("Order status updated to 'On the Way'.");
    }, 5000);

    setTimeout(async () => {
        await orderRef.update({ status: 'Delivered' });
        console.log("Order status updated to 'Delivered'.");
    }, 10000);
});

// Fetch and display user's order history
async function fetchOrderHistory() {
    const orderList = document.getElementById('order-history-list');
    orderList.innerHTML = ''; // Clear existing list

    if (!currentUserId) {
        orderList.innerHTML = '<p>Please log in to see your order history.</p>';
        return;
    }

    const snapshot = await db.collection('orders').where('userId', '==', currentUserId).orderBy('orderDate', 'desc').get();
    
    if (snapshot.empty) {
        orderList.innerHTML = '<p>You have no orders yet.</p>';
        return;
    }

    snapshot.forEach(doc => {
        const order = doc.data();
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p><strong>Order Date:</strong> ${order.orderDate.toDate().toLocaleString()}</p>
            <p><strong>Status:</strong> <span class="order-status ${order.status.toLowerCase().replace(/\s/g, '-')}">${order.status}</span></p>
            <p><strong>Items:</strong> ${order.quantity}</p>
            <p><strong>Add-ons:</strong> ${order.addOns.join(', ')}</p>
        `;
        orderList.appendChild(listItem);
    });
}

// Handle logout button click
document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await auth.signOut();
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
}); 