document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for reaching out! We'll get back to you soon.");
        this.reset();
    });

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
// Example: Log a message when the WhatsApp button is clicked
document.querySelector('.whatsapp-button a').addEventListener('click', function () {
    console.log('WhatsApp button clicked!');
});
    // Load CCTV model
    const loader = new THREE.GLTFLoader();
    loader.load('cctv_camera.gltf', function(gltf) {
        const cameraModel = gltf.scene;
        scene.add(cameraModel);
        
        // Scale and position the model
        cameraModel.scale.set(0.5, 0.5, 0.5);
        cameraModel.position.set(0, 0, -3);

        // Animate the camera model
        gsap.fromTo(cameraModel.rotation, { y: 0 }, { y: Math.PI * 2, duration: 10, repeat: -1 });
    }, undefined, function(error) {
        console.error(error);
    });

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeigt);
    });
});
