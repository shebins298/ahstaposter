document.getElementById("generateBtn").addEventListener("click", function () {
    const canvas = document.getElementById("templateCanvas");
    const ctx = canvas.getContext("2d");

    // Load the template image
    const templateImg = new Image();
    templateImg.src = "template.jpg"; // Ensure the correct path
    templateImg.onload = function () {
        // Set canvas size to match the template
        canvas.width = templateImg.width;
        canvas.height = templateImg.height;
        ctx.drawImage(templateImg, 0, 0, templateImg.width, templateImg.height);

        // Load user photo
        const photoInput = document.getElementById("photoInput").files[0];
        if (photoInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const userImg = new Image();
                userImg.src = event.target.result;
                userImg.onload = function () {
                    const maxPhotoWidth = 500;
                    const maxPhotoHeight = 500;
                    const photoX = canvas.width - maxPhotoWidth - 50; // Bottom-right corner
                    const photoY = canvas.height - maxPhotoHeight - 50;

                    // Maintain aspect ratio
                    const aspectRatio = userImg.width / userImg.height;
                    let drawWidth = maxPhotoWidth;
                    let drawHeight = maxPhotoHeight;

                    if (aspectRatio > 1) {
                        // Landscape image
                        drawHeight = maxPhotoWidth / aspectRatio;
                    } else {
                        // Portrait or square image
                        drawWidth = maxPhotoHeight * aspectRatio;
                    }

                    // Center the photo properly
                    const adjustedX = photoX + (maxPhotoWidth - drawWidth) / 2;
                    const adjustedY = photoY + (maxPhotoHeight - drawHeight) / 2;

                    ctx.drawImage(userImg, adjustedX, adjustedY, drawWidth, drawHeight); // Draw photo
                    drawText(ctx, adjustedX - 30, adjustedY + 50); // Adjust text position
                };
            };
            reader.readAsDataURL(photoInput);
        } else {
            drawText(ctx, canvas.width - 170, canvas.height - 110);
        }
    };
});

function drawText(ctx, textX, textY) {
    const name = document.getElementById("nameInput").value.trim();
    const role = document.getElementById("roleInput").value.trim();
    const district = document.getElementById("districtInput").value.trim();

    ctx.textAlign = "right"; // Align text to the left of the photo
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 5;

    // Gradient effect for the name
    const gradient = ctx.createLinearGradient(textX - 100, textY - 40, textX, textY + 40);
    gradient.addColorStop(0, "#004AAD"); // Deep blue
    gradient.addColorStop(1, "#0085FF"); // Light blue

    // Name Styling - Large, bold, and gradient
    ctx.font = "bold 82px Arial";
    ctx.fillStyle = gradient;
    ctx.fillText(name, textX, textY);

    // Role Styling - Medium size, bold, and stylish gold color
    ctx.font = "bold 72px Arial";
    ctx.fillStyle = "#D4AF37"; // Gold color
    ctx.fillText(role, textX, textY + 55);

    // District Styling - Small, sleek, and subtle silver color
    ctx.font = "68px Arial";
    ctx.fillStyle = "#A8A9AD"; // Soft silver
    ctx.fillText(district, textX, textY + 100);

    document.getElementById("downloadBtn").classList.remove("hidden");
}

// Download function
document.getElementById("downloadBtn").addEventListener("click", function () {
    const canvas = document.getElementById("templateCanvas");
    const imageUrl = canvas.toDataURL("image/png");  // Get the image URL from the canvas
    
    // Create an anchor element and simulate a click to download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "AHSTA STATE CONFERENCE 2025.png";  // Set the default file name
    link.click();  // Trigger the download
});
