document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    // Function to show notifications
    function showNotification(type, message) {
        const notification = document.getElementById("notification");
        notification.className = type === "success" ? "alert alert-success" : "alert alert-danger";
        notification.innerText = message;
        notification.style.display = "block";
        setTimeout(() => notification.style.display = "none", 3000);
    }

    // Fetch user profile data including profile picture
    fetch('http://localhost:3000/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => {
            // Update profile display fields
            document.getElementById("firstNameDisplay").innerText = data.firstName;
            document.getElementById("lastNameDisplay").innerText = data.lastName;
            document.getElementById("emailDisplay").innerText = data.email;
            document.getElementById("roleDisplay").innerText = data.role;
            // Set profile picture if available
            document.getElementById("profilePicturePreview").src = data.profilePicture || 'img/default-profile.jpg';
        })
        .catch(error => showNotification("error", "Failed to load profile"));

    // Handle profile picture upload
    document.getElementById("profile-picture-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const fileInput = document.getElementById("profilePicture");

        if (fileInput.files.length === 0) {
            showNotification("error", "Please select a picture to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("profilePicture", fileInput.files[0]);

        fetch('http://localhost:3000/profile/picture', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.profilePicture) {
                    showNotification("success", "Profile picture uploaded successfully.");
                    document.getElementById("profilePicturePreview").src = data.profilePicture;
                } else {
                    showNotification("error", "Failed to upload profile picture.");
                }
            })
            .catch(error => showNotification("error", "Error uploading profile picture."));
    });

    // Handle profile info edit
    document.getElementById("editBtn").addEventListener("click", function () {
        document.getElementById("profile-info").style.display = "none";
        document.getElementById("profile-form").style.display = "block";
    });

    // Handle profile info update
    document.getElementById("profile-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;

        const payload = { firstName, lastName };

        fetch('http://localhost:3000/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                showNotification("success", "Profile updated successfully");
                document.getElementById("firstNameDisplay").innerText = data.firstName;
                document.getElementById("lastNameDisplay").innerText = data.lastName;
                document.getElementById("profile-form").style.display = "none";
                document.getElementById("profile-info").style.display = "block";
            })
            .catch(error => showNotification("error", "Failed to update profile"));
    });
});
