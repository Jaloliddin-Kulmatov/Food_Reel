document.addEventListener('DOMContentLoaded', () => {
    // Make sure Firebase is loaded before trying to use it
    if (typeof firebase === 'undefined') {
        console.error("Firebase SDK not loaded. Check your script tags.");
        return;
    }

    const auth = firebase.auth();
    const logoutBtn = document.getElementById('logout-btn');

    // Listener for authentication state changes
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // If no user is signed in, they are not allowed here.
            // Redirect them back to the login page.
            console.log("No user is logged in. Redirecting to login page.");
            window.location.href = '/index.html';
        } else {
            // User is signed in.
            console.log("User is authenticated:", user.email);
        }
    });

    // Attach the logout function to the logout button if it exists
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log("User signed out successfully.");
                // The onAuthStateChanged listener above will automatically handle the redirect.
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        });
    }
}); 