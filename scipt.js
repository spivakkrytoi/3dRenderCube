var input = document.getElementById("valw")

// Створення сцени
const scene = new THREE.Scene();

// Створення камери
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

// Створення рендерера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;  // Увімкнення тіней
document.body.appendChild(renderer.domElement);

// Створення джерела світла, яке відкидає тіні
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 10, 3);  // Позиція джерела світла
light.castShadow = true;       // Світло відкидає тіні
scene.add(light);

// Додаткове оточуюче світло, щоб трохи освітлити сцену
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Додає м'яке освітлення
scene.add(ambientLight);

// Створення геометрії куба та матеріалу, який підтримує тіні
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false}); // Матеріал, який реагує на світло

// Створення об'єкта Mesh і додавання до сцени
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;  // Куб відкидає тінь
cube.receiveShadow = true; // Куб отримує тінь
scene.add(cube);

// Створення площини для відображення тіней
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;  // Площина отримує тінь
scene.add(plane);

// Оновлена функція анімації
function animate() {
    requestAnimationFrame(animate);
    
    // Обертання куба
    cube.rotation.x += 0.003;
    cube.rotation.z += 0.003;
    cube.rotation.y += 0.003;

    // Оновлення сцени
    renderer.render(scene, camera);
}

// Запуск анімації
animate();
