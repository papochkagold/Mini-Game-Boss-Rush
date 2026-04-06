import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Изображение иконок
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    Sword: <><path d="M14.5 17.5L3 6V3h3l11.5 11.5c.5.5.5 1.5 0 2l-1.5 1.5c-.5.5-1.5.5-2 0z"/><path d="M13 19l2-2"/><path d="M16 16l2-2"/><path d="M19 21l2-2"/><path d="M21 19l-2-2"/></>,
    Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    Heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    Skull: <><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="M12 2a7 7 0 00-7 7v5l2 2v4h10v-4l2-2v-5a7 7 0 00-7-7z"/></>,
    Trophy: <><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></>,
    RefreshCcw: <><path d="M3 2v6h6"/><path d="M21 12A9 9 0 006 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0015 6.7l3-2.7"/></>,
    Package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    Sparkles: <><path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></>,
    Droplets: <><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7 6.3 7 6.3s-2.15 2.76-3.29 3.69C2.57 10.92 2 12.02 2 13.18 2 15.4 3.8 17.2 6 17.2z"/><path d="M17 21.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S17 11.3 17 11.3s-2.15 2.76-3.29 3.69c-1.14.93-1.71 2.03-1.71 3.19 0 2.22 1.8 4.02 4 4.02z"/></>,
    BookOpen: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
    Wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    Info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
    Wind: <><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></>,
    Cog: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></>,
    Dice: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></>,
    Map: <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    Ghost: <><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></>
  };

  return (
      <svg
          width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={className}
      >
        {icons[name] || icons.Shield}
      </svg>
  );
};

// Дрочь с кубиком
const InteractiveDice = ({ onRollComplete }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    mountRef.current.innerHTML = '';

    const width = 300;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const diceGroup = new THREE.Group();
    scene.add(diceGroup);

    // Геометрия D20
    let geometry = new THREE.IcosahedronGeometry(1, 0);
    geometry = geometry.toNonIndexed();
    geometry.computeVertexNormals(); // Важно для резких граней

    const material = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Золотой
      roughness: 0.3,
      metalness: 0.4,
      flatShading: true // Делает грани чёткими и ру рублеными
    });
    const diceMesh = new THREE.Mesh(geometry, material);
    diceGroup.add(diceMesh);

    const pos = geometry.attributes.position;
    const faceData = [];

    // Добавляем цифры на каждую из 20 граней
    for (let i = 0; i < pos.count; i += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, i);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i+1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, i+2);

      const centroid = a.clone().add(b).add(c).divideScalar(3);
      const normal = new THREE.Triangle(a, b, c).getNormal(new THREE.Vector3());

      const num = (i / 3) + 1; // Номер грани (1-20)

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 256, 256); // Полностью прозрачный фон

      // Жирные черные цифры
      ctx.fillStyle = '#000000';
      ctx.font = '900 120px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(num.toString(), 128, 128);

      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const planeGeom = new THREE.PlaneGeometry(0.5, 0.5);
      const planeMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.5, // Идеально вырезает прозрачный фон без багов сортировки
        depthWrite: false
      });

      const plane = new THREE.Mesh(planeGeom, planeMat);
      // Выдвигаем плоскость с цифрой чуть-чуть вперед от грани
      plane.position.copy(centroid).add(normal.clone().multiplyScalar(0.015));
      plane.lookAt(centroid.clone().add(normal.clone().multiplyScalar(2)));
      diceGroup.add(plane);

      faceData.push({ num, normal, plane });
    }

    let isDragging = false;
    let isRolling = false;
    let isAligning = false;
    let isSnapping = false;
    let hasRolled = false;

    let previousMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let angVel = new THREE.Vector3();
    let targetQuaternion = new THREE.Quaternion();
    let bestFace = null;

    // Случайный поворот в начале
    diceGroup.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    const handlePointerDown = (e) => {
      if (isRolling || isSnapping || hasRolled) return;
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
      velocity = { x: 0, y: 0 };
      angVel.set(0, 0, 0);
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - previousMouse.x;
      const dy = e.clientY - previousMouse.y;
      previousMouse = { x: e.clientX, y: e.clientY };
      velocity = { x: dx, y: dy };

      const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * 0.01);
      const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * 0.01);
      diceGroup.quaternion.premultiply(qX).premultiply(qY);
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;

        const dragSpeed = Math.sqrt(velocity.x**2 + velocity.y**2);

        if (dragSpeed > 2) {
          // Кидок свайпом
          angVel.set(velocity.y * 0.05, velocity.x * 0.05, (Math.random() - 0.5) * 0.5);
        } else {
          // Клик/Тап по кубику - сильный случайный бросок
          angVel.set(
              (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 1.0),
              (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 1.0),
              (Math.random() - 0.5) * 1.5
          );
        }
        isRolling = true;
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRolling) {
        const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angVel.x);
        const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angVel.y);
        const qZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angVel.z);
        diceGroup.quaternion.premultiply(qX).premultiply(qY).premultiply(qZ);

        // Тяжелая гравитация кубика (прыжки затухают)
        const speed = angVel.length();
        diceGroup.position.y = Math.abs(Math.sin(Date.now() * 0.015)) * speed * 2;

        angVel.multiplyScalar(0.92); // Сильное трение для быстрой остановки

        if (speed < 0.04) { // Повышенный порог остановки, чтобы не зависал
          isRolling = false;
          let maxZ = -Infinity;
          faceData.forEach(face => {
            const worldNormal = face.normal.clone().applyQuaternion(diceGroup.quaternion).normalize();
            if (worldNormal.z > maxZ) {
              maxZ = worldNormal.z;
              bestFace = face;
            }
          });
          isAligning = true;
        }
      } else {
        // Плавно опускаем на землю
        diceGroup.position.y = THREE.MathUtils.lerp(diceGroup.position.y, 0, 0.2);
      }

      if (isAligning && bestFace) {
        const targetNormal = new THREE.Vector3(0, 0, 1); // Смотрит в камеру
        const worldNormal = bestFace.normal.clone().applyQuaternion(diceGroup.quaternion).normalize();

        const q1 = new THREE.Quaternion().setFromUnitVectors(worldNormal, targetNormal);

        // Доворачиваем так, чтобы цифра не лежала на боку
        const tempGroup = new THREE.Group();
        tempGroup.quaternion.copy(diceGroup.quaternion).premultiply(q1);
        const planeUpWorld = bestFace.plane.up.clone().applyQuaternion(tempGroup.quaternion).normalize();
        planeUpWorld.z = 0;

        if (planeUpWorld.lengthSq() > 0.001) {
          planeUpWorld.normalize();
          const q2 = new THREE.Quaternion().setFromUnitVectors(planeUpWorld, new THREE.Vector3(0, 1, 0));
          targetQuaternion = diceGroup.quaternion.clone().premultiply(q1).premultiply(q2);
        } else {
          targetQuaternion = diceGroup.quaternion.clone().premultiply(q1);
        }

        isAligning = false;
        isSnapping = true;
      }

      if (isSnapping) {
        diceGroup.quaternion.slerp(targetQuaternion, 0.2); // Быстрый магнит
        if (diceGroup.quaternion.angleTo(targetQuaternion) < 0.1) { // Увеличенный порог
          diceGroup.quaternion.copy(targetQuaternion);
          isSnapping = false;
          if (!hasRolled) {
            hasRolled = true;
            onRollComplete(bestFace.num);
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      faceData.forEach(f => {
        f.plane.geometry.dispose();
        f.plane.material.map.dispose();
        f.plane.material.dispose();
      });
    };
  }, [onRollComplete]);

  return (
      <div className="flex flex-col items-center justify-center relative w-full h-[300px]">
        {/* Убрали drop-shadow, чтобы не плодились фантомы! Подсветку делаем через radial-gradient фона */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,transparent_60%)] pointer-events-none" />
        <div
            ref={mountRef}
            className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform z-10"
            style={{ width: '300px', height: '300px', touchAction: 'none' }}
        />
      </div>
  );
};

// Данные игры:

const CLASSES = [
  { id: 'warrior', name: 'Воин', desc: 'Могучий боец. Имеет встроенные шипы (5 урона).', hp: 130, attack: 14, defense: 4, thorns: 5, icon: 'Sword' },
  { id: 'mimic', name: 'Собиратель', desc: 'Начинает игру с ДВУМЯ случайными артефактами!', hp: 100, attack: 10, defense: 2, thorns: 0, icon: 'Package' },
  { id: 'engineer', name: 'Инженер', desc: 'Уникальные артефакты. Может строить Турели (5 урона/ход).', hp: 80, attack: 6, defense: 2, thorns: 0, icon: 'Wrench' }
];

const INITIAL_PLAYER_BASE = {
  classId: '',
  hp: 100,
  maxHp: 100,
  baseAttack: 10,
  baseDefense: 2,
  baseThorns: 0,
  healPotions: 3,
  relics: [],
  finalBossWeakened: false
};

const BOSSES = [
  {
    name: "Король Слизней", maxHp: 65, attack: 10, defense: 0, color: "text-green-400", bg: "bg-green-900",
    ai: (turn, hp, maxHp) => {
      if (hp < maxHp * 0.5 && Math.random() < 0.10) return { action: 'flee', msg: "Слизень в панике сбегает с поля боя!" };
      return { action: 'attack', mult: 1, msg: "Король Слизней напрыгивает на вас!" };
    }
  },
  {
    name: "Безумный Гоблин", maxHp: 140, attack: 16, defense: 2, color: "text-amber-400", bg: "bg-amber-900",
    ai: (turn, hp, maxHp) => {
      if (turn % 3 === 2) return { action: 'pierce_attack', mult: 1.2, msg: "Безумный Гоблин бьет Кинжалом (Игнорирует броню)!" };
      return { action: 'attack', mult: 1, msg: "Безумный Гоблин яростно размахивает дубиной!" };
    }
  },
  {
    name: "Проклятый Рыцарь", maxHp: 300, attack: 28, defense: 8, color: "text-gray-400", bg: "bg-gray-800",
    ai: (turn, hp, maxHp) => {
      if (turn % 4 === 3) return { action: 'attack', mult: 2, msg: "Проклятый Рыцарь наносит Сокрушительный Удар мечом!" };
      if (Math.random() < 0.35) return { action: 'buff_def', val: 10, msg: "Проклятый Рыцарь поднимает башенный щит (+10 Защиты на следующий ход)!" };
      return { action: 'attack', mult: 1, msg: "Проклятый Рыцарь проводит стандартную атаку." };
    }
  },
  {
    name: "Огненный Дрейк", maxHp: 600, attack: 50, defense: 12, color: "text-red-500", bg: "bg-red-900",
    ai: (turn, hp, maxHp) => {
      if (turn % 4 === 3) return { action: 'charge', msg: "Огненный Дрейк делает глубокий вдох... ВОЗДУХ ВОКРУГ НАКАЛЯЕТСЯ ДО ПРЕДЕЛА!" };
      if (turn % 4 === 0) return { action: 'attack', mult: 5, msg: "ОГНЕННЫЙ ШТОРМ! Сжигает всё на своем пути!" };
      return { action: 'attack', mult: 1, msg: "Огненный Дрейк рвет вас когтями!" };
    }
  },
  {
    name: "Повелитель Бездны", maxHp: 1600, attack: 80, defense: 25, color: "text-purple-500", bg: "bg-purple-900",
    ai: (turn, hp, maxHp) => {
      if (turn % 5 === 4) return { action: 'heal', val: 120, msg: "Повелитель Бездны вытягивает энергию из пространства (+120 ОЗ)!" };
      return { action: 'vampire_attack', mult: 1.3, healPct: 0.4, msg: "Повелитель Бездны бьет Теневой Косой, вытягивая вашу жизнь!" };
    }
  }
];

const STANDARD_RELIC_POOL = [
  { id: 1, name: "Острый Клинок", desc: "+12 к Атаке", tags: ["Оружие"], icon: <Icon name="Sword" size={18}/>, modifiers: { attack: 12 } },
  { id: 2, name: "Тяжелый Доспех", desc: "+8 к Защите", tags: ["Броня"], icon: <Icon name="Shield" size={18}/>, modifiers: { defense: 8 } },
  { id: 3, name: "Амулет Жизни", desc: "+75 Макс. Здоровья", tags: ["Магия"], icon: <Icon name="Heart" size={18}/>, onPickup: (p) => ({...p, maxHp: p.maxHp + 75, hp: p.hp + 75}) },
  { id: 4, name: "Зелье Изобилия", desc: "+4 Зелья Лечения", tags: ["Магия"], icon: <Icon name="Package" size={18}/>, onPickup: (p) => ({...p, healPotions: p.healPotions + 4}) },
  { id: 5, name: "Клык Вампира", desc: "25% кража здоровья", tags: ["Кровь"], icon: <Icon name="Droplets" size={18}/>, modifiers: { vampirism: 25 } },
  { id: 6, name: "Шипованный Щит", desc: "Возвращает 15 урона", tags: ["Броня", "Оружие"], icon: <Icon name="Shield" size={18}/>, modifiers: { thorns: 15 } },
  { id: 7, name: "Глаз Убийцы", desc: "+25% шанс крит. удара", tags: ["Кровь", "Магия"], icon: <Icon name="Zap" size={18}/>, modifiers: { critChance: 25 } },
  { id: 8, name: "Кольцо Титана", desc: "+20 Атака, -3 Защита", tags: ["Оружие", "Магия"], icon: <Icon name="Sword" size={18}/>, modifiers: { attack: 20, defense: -3 } },
  { id: 9, name: "Кровавый Топор", desc: "+15 Атака, +10% Вампиризм", tags: ["Оружие", "Кровь"], icon: <Icon name="Sword" size={18}/>, modifiers: { attack: 15, vampirism: 10 } },
  { id: 10, name: "Плащ Теней", desc: "+5 Защита, +15% Крит", tags: ["Броня", "Магия"], icon: <Icon name="BookOpen" size={18}/>, modifiers: { defense: 5, critChance: 15 } },
  { id: 11, name: "Проклятая Корона", desc: "+35 Атака, -15 Защита", tags: ["Оружие", "Кровь"], icon: <Icon name="Skull" size={18}/>, modifiers: { attack: 35, defense: -15 } },
];

const ENGINEER_RELIC_POOL = [
  { id: 101, name: "Авто-Завод", desc: "+1 Турель в начале боя", tags: ["Механизм"], icon: <Icon name="Cog" size={18}/>, modifiers: { startTurrets: 1 } },
  { id: 102, name: "Усиленные Стволы", desc: "Урон турелей +3", tags: ["Механизм", "Оружие"], icon: <Icon name="Wrench" size={18}/>, modifiers: { turretDamage: 3 } },
  { id: 103, name: "Нано-Роботы", desc: "Лечение: +2 ОЗ в ход за каждую турель", tags: ["Механизм", "Магия"], icon: <Icon name="Heart" size={18}/>, modifiers: { turretHeal: 2 } },
  { id: 104, name: "Титановый Корпус", desc: "+10 к Защите", tags: ["Броня"], icon: <Icon name="Shield" size={18}/>, modifiers: { defense: 10 } },
  { id: 105, name: "Плазменный Резак", desc: "+15 Атака Героя", tags: ["Оружие"], icon: <Icon name="Sword" size={18}/>, modifiers: { attack: 15 } },
  { id: 106, name: "Лазерный Прицел", desc: "+30% Шанс крит. удара Героя", tags: ["Механизм"], icon: <Icon name="Zap" size={18}/>, modifiers: { critChance: 30 } },
  { id: 107, name: "Генератор Поля", desc: "+80 Макс. Здоровья", tags: ["Броня", "Механизм"], icon: <Icon name="Shield" size={18}/>, onPickup: (p) => ({...p, maxHp: p.maxHp + 80, hp: p.hp + 80}) },
];

const TAG_COLORS = {
  'Оружие': 'bg-red-900/80 text-red-200 border-red-700',
  'Броня': 'bg-blue-900/80 text-blue-200 border-blue-700',
  'Магия': 'bg-purple-900/80 text-purple-200 border-purple-700',
  'Кровь': 'bg-rose-900/80 text-rose-200 border-rose-700',
  'Механизм': 'bg-cyan-900/80 text-cyan-200 border-cyan-700',
};

export default function App() {
  const [gameState, setGameState] = useState('menu');
  const [activeTab, setActiveTab] = useState('battle');

  const [player, setPlayer] = useState(INITIAL_PLAYER_BASE);
  const [bossIndex, setBossIndex] = useState(0);
  const [bossHp, setBossHp] = useState(0);
  const [bossTempDefense, setBossTempDefense] = useState(0);
  const [turnCounter, setTurnCounter] = useState(0);
  const [logs, setLogs] = useState([]);

  const [isBossTurn, setIsBossTurn] = useState(false);
  const [isDodging, setIsDodging] = useState(false);
  const [dodgeCooldown, setDodgeCooldown] = useState(0);
  const [extraTurns, setExtraTurns] = useState(0);
  const [turrets, setTurrets] = useState(0);
  const [slimeFled, setSlimeFled] = useState(false);

  const [lootOptions, setLootOptions] = useState([]);
  const logsEndRef = useRef(null);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [firstDodgeUsed, setFirstDodgeUsed] = useState(false);

  const [diceResult, setDiceResult] = useState(null);
  const [diceMessage, setDiceMessage] = useState("");

  const [ngPlusRelics, setNgPlusRelics] = useState([]);
  const [cursedWingsAcquired, setCursedWingsAcquired] = useState(false);

  const playerStats = useMemo(() => {
    let current = {
      attack: player.baseAttack,
      defense: player.baseDefense,
      thorns: player.baseThorns,
      vampirism: 0,
      critChance: 0,
      turretDamage: 0,
      turretHeal: 0,
      startTurrets: 0,
      maxHp: player.maxHp
    };
    let tagCounts = {};

    player.relics.forEach(relic => {
      if (relic.modifiers) {
        current.attack += relic.modifiers.attack || 0;
        current.defense += relic.modifiers.defense || 0;
        current.vampirism += relic.modifiers.vampirism || 0;
        current.thorns += relic.modifiers.thorns || 0;
        current.critChance += relic.modifiers.critChance || 0;
        current.turretDamage += relic.modifiers.turretDamage || 0;
        current.turretHeal += relic.modifiers.turretHeal || 0;
        current.startTurrets += relic.modifiers.startTurrets || 0;
      }
      relic.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    let activeSynergies = [];
    if (tagCounts['Оружие'] >= 2) {
      current.attack += 15;
      activeSynergies.push({name: 'Мастер Оружия', effect: '+15 Атака'});
    }
    if (tagCounts['Броня'] >= 2) {
      current.defense += 8;
      activeSynergies.push({name: 'Танк', effect: '+8 Защита'});
    }
    if (tagCounts['Кровь'] >= 2) {
      current.vampirism += 25;
      activeSynergies.push({name: 'Вампир', effect: '+25% Вампиризм'});
    }
    if (tagCounts['Магия'] >= 2) {
      current.critChance += 20;
      activeSynergies.push({name: 'Архимаг', effect: '+20% Крит'});
    }
    if (tagCounts['Механизм'] >= 2) {
      current.turretDamage += 3;
      activeSynergies.push({name: 'Инженерия', effect: '+3 Урон Турелей'});
    }

    return {...current, activeSynergies, tagCounts};
  }, [player]);

  const currentBoss = useMemo(() => {
    if (!BOSSES[bossIndex]) return null;
    let b = {...BOSSES[bossIndex]};
    if (bossIndex === 1 && slimeFled) {
      b.name = "Гоблин верхом на Слизне";
      b.maxHp += BOSSES[0].maxHp;
      b.attack += BOSSES[0].attack;
    }
    if (player.finalBossWeakened && bossIndex === BOSSES.length - 1) {
      b.maxHp = 100;
      b.attack = Math.floor(b.attack / 2);
      b.name += " (Ослаблен до 100 ОЗ)";
    }
    return b;
  }, [bossIndex, slimeFled, player.finalBossWeakened]);

  useEffect(() => {
    if (gameState === 'playing' && currentBoss && turnCounter === 0) {
      setBossHp(currentBoss.maxHp);
      setBossTempDefense(0);
      setTurnCounter(1);
      setIsBossTurn(false);
      setIsDodging(false);
      setDodgeCooldown(0);
      setExtraTurns(0);
      setTurrets(playerStats.startTurrets || 0);
      setActiveTab('battle');
      addLog(`Появляется ${currentBoss.name}! Приготовьтесь к бою.`, 'system');
    }
  }, [bossIndex, gameState, turnCounter, currentBoss, playerStats.startTurrets]);

  useEffect(() => {
    if (logsEndRef.current && activeTab === 'battle') {
      logsEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [logs, activeTab]);

  useEffect(() => {
    if (gameState === 'playing' && isBossTurn) {
      const timer = setTimeout(() => {
        let nextBossHp = bossHp;

        let currentPlayerHp = player.hp;
        let currentPotions = player.healPotions;

        if (turrets > 0) {
          let dmgPerTurret = 5 + playerStats.turretDamage;
          let turretDmg = turrets * dmgPerTurret;
          nextBossHp = Math.max(0, nextBossHp - turretDmg);
          addLog(`Турели (${turrets} шт.) пассивно наносят ${turretDmg} урона!`, 'player');

          if (playerStats.turretHeal > 0) {
            let tHeal = playerStats.turretHeal * turrets;
            currentPlayerHp = Math.min(playerStats.maxHp, currentPlayerHp + tHeal);
            addLog(`Нано-роботы восстановили ${tHeal} ОЗ.`, 'heal');
          }

          if (nextBossHp === 0) {
            setBossHp(0);
            setPlayer(p => ({...p, hp: currentPlayerHp}));
            handleBossDeath(currentBoss);
            return;
          }
        }

        setBossTempDefense(0);

        const aiResult = currentBoss.ai(turnCounter, nextBossHp, currentBoss.maxHp);

        if (aiResult.action === 'flee') {
          setSlimeFled(true);
          setBossHp(0);
          setPlayer(p => ({...p, hp: currentPlayerHp}));
          addLog(aiResult.msg, 'victory');
          handleBossDeath(currentBoss, true);
          return;
        }

        let damageToPlayer = 0;
        let isAttackAction = ['attack', 'pierce_attack', 'vampire_attack'].includes(aiResult.action);

        addLog(`[Ход Босса] ${aiResult.msg}`, 'boss');

        if (turrets > 0 && isAttackAction && Math.random() < 0.4) {
          let destroyed = Math.min(3, turrets);
          setTurrets(t => t - destroyed);
          addLog(`Босс отвлекся и уничтожил ${destroyed} турел${destroyed > 1 ? 'и' : 'ь'} вместо атаки по вам!`, 'error');
          if (isDodging) addLog(`Вы приготовились к увороту, но босс занят турелями...`, 'system');
        } else {
          if (isAttackAction) {
            if (isDodging) {
              addLog(`ИДЕАЛЬНЫЙ УВОРОТ! Вы не получаете урона и получаете ДОП. ХОД!`, 'victory');
              setExtraTurns(1);
            } else {
              let dmg = Math.floor(currentBoss.attack * (aiResult.mult || 1));
              if (aiResult.action === 'pierce_attack') {
                damageToPlayer = Math.max(1, dmg);
              } else if (aiResult.action === 'vampire_attack') {
                damageToPlayer = Math.max(1, dmg - playerStats.defense);
                let healAmount = Math.floor(damageToPlayer * (aiResult.healPct || 0.4));
                if (healAmount > 0) {
                  nextBossHp = Math.min(currentBoss.maxHp, nextBossHp + healAmount);
                  addLog(`${currentBoss.name} вытягивает ${healAmount} ОЗ!`, 'error');
                }
              } else {
                damageToPlayer = Math.max(1, dmg - playerStats.defense);
              }
            }
          } else if (aiResult.action === 'charge') {
            if (isDodging) addLog(`Вы приготовились к увороту слишком рано! Уворот сгорел...`, 'error');
          } else if (aiResult.action === 'heal') {
            nextBossHp = Math.min(currentBoss.maxHp, nextBossHp + (aiResult.val || 0));
            if (isDodging) addLog(`Уворот потрачен впустую.`, 'system');
          } else if (aiResult.action === 'buff_def') {
            setBossTempDefense(aiResult.val || 0);
            if (isDodging) addLog(`Уворот потрачен впустую.`, 'system');
          }
        }

        const hasCursedWings = player.relics.some(r => r.id === 999);

        if (hasCursedWings && damageToPlayer > 0) {
          if (Math.random() < 0.5) {
            addLog("Проклятые Крылья спасли вас!", 'victory');
            damageToPlayer = 0;
          } else {
            damageToPlayer *= 2;
            addLog("Проклятые Крылья ПРЕДАЛИ вас!", 'error');
          }
        }

        if (damageToPlayer > 0) {
          addLog(`Вы получаете ${damageToPlayer} урона.`, 'boss');
        }

        let thornsDamage = 0;
        if (playerStats.thorns > 0 && damageToPlayer > 0) {
          thornsDamage = playerStats.thorns;
          addLog(`Ваши шипы наносят боссу ${thornsDamage} урона!`, 'player');
        }

        nextBossHp = Math.max(0, nextBossHp - thornsDamage);

        currentPlayerHp = Math.max(0, currentPlayerHp - damageToPlayer);

        if (currentPlayerHp > 0 && currentPlayerHp < playerStats.maxHp * 0.3 && currentPotions > 0) {
          let healAmount = Math.floor(playerStats.maxHp * 0.4);
          currentPlayerHp = Math.min(playerStats.maxHp, currentPlayerHp + healAmount);
          currentPotions -= 1;
          addLog("Фляжка сработала автоматически!", 'heal');
        }

        setPlayer(p => ({
          ...p,
          hp: currentPlayerHp,
          healPotions: currentPotions
        }));

        setBossHp(nextBossHp);
        setIsDodging(false);

        if (currentPlayerHp === 0) {
          setGameState('gameover');
          addLog(`Вы погибли в бою...`, 'error');
        } else if (nextBossHp === 0) {
          handleBossDeath(currentBoss);
        } else {
          setIsBossTurn(false);
          setTurnCounter(t => t + 1);
        }

      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isBossTurn, gameState]);

  const addLog = (message, type = 'normal') => {
    setLogs(prev => [...prev, {id: Date.now() + Math.random(), message, type}]);
  };

  const selectClass = (cls) => {
    let startingRelics = [];
    let pool = cls.id === 'engineer' ? ENGINEER_RELIC_POOL : STANDARD_RELIC_POOL;

    if (cls.id === 'mimic') {
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      startingRelics.push(shuffled[0], shuffled[1]);
    }

    setPlayer(p => ({
      ...INITIAL_PLAYER_BASE,
      classId: cls.id,
      hp: cls.hp,
      maxHp: cls.hp,
      baseAttack: cls.attack,
      baseDefense: cls.defense,
      baseThorns: cls.thorns,
      relics: [...ngPlusRelics, ...startingRelics]
    }));

    setNgPlusRelics([]);
    setBossIndex(0);
    setLogs([]);
    setTurrets(0);
    setSlimeFled(false);
    generateLootOptions(cls.id);
    setGameState('start_item');
  };

  const generateLootOptions = (classId) => {
    const pool = classId === 'engineer' ? ENGINEER_RELIC_POOL : STANDARD_RELIC_POOL;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setLootOptions(shuffled.slice(0, 3));
  };

  const triggerRandomEvent = () => {
    const events = ['dutchman', 'dice', 'treasure', 'forest'];
    const random = events[Math.floor(Math.random() * events.length)];
    setCurrentEvent(random);

    if (random === 'treasure') {
      generateLootOptions(player.classId);
    }

    setDiceResult(null);
    setDiceMessage("");
    setGameState('event');
  };

  const goToNextBattle = (step = 1, keepLogs = false) => {
    const nextIdx = bossIndex + step;
    if (nextIdx < BOSSES.length) {
      setBossIndex(nextIdx);
      setTurnCounter(0);
      if (!keepLogs) setLogs([]);
      setGameState('playing');
    } else {
      setGameState('victory');
    }
  };

  const applyRelicAndContinue = (relic, isStartItem = false) => {
    setPlayer(p => {
      let updatedPlayer = {...p, relics: [...p.relics, relic]};
      if (relic.onPickup) {
        updatedPlayer = relic.onPickup(updatedPlayer);
      }
      if (!isStartItem) {
        updatedPlayer.hp = Math.min(updatedPlayer.maxHp, updatedPlayer.hp + Math.floor(updatedPlayer.maxHp * 0.2));
      }
      return updatedPlayer;
    });

    setCursedWingsAcquired(false);
    if (isStartItem) {
      setTurnCounter(0);
      setLogs([]);
      setGameState('playing');
    } else {
      goToNextBattle(1);
    }
  };

  const handleBossDeath = (boss, fled = false) => {
    if (fled) {
      addLog(`${boss.name} сбежал! Победа в этом раунде.`, 'victory');
    } else {
      addLog(`Вы повергли босса: ${boss.name}!`, 'victory');
    }
    setIsBossTurn(false);

    setTimeout(() => {
      const isLastBoss = bossIndex === BOSSES.length - 1;

      if (!isLastBoss && Math.random() < 0.5) {
        triggerRandomEvent();
      } else {
        if (!isLastBoss) {
          generateLootOptions(player.classId);
          setGameState('loot');
        } else {
          setGameState('victory');
        }
      }
    }, 1200);
  };

  // События:
  const handleDutchman = (choice) => {
    if (choice === 'skip') {
      const isNextFinal = (bossIndex + 1) === BOSSES.length - 1;

      if (isNextFinal) {
        setPlayer(p => ({...p, finalBossWeakened: true}));
        setLogs([{id: Date.now(), message: "Вы проплыли сквозь туман... Финальный босс ОСЛАБЛЕН!", type: 'victory'}]);
        goToNextBattle(1, true);
      } else {
        const cursedRelic = {
          id: 999,
          name: "Проклятые Крылья",
          desc: "50% шанс игнорировать урон или получить x2",
          tags: ["Проклятие"],
          icon: <Icon name="Ghost" size={18}/>,
          modifiers: {}
        };
        setPlayer(p => ({...p, relics: [...p.relics, cursedRelic]}));
        setLogs([{id: Date.now(), message: "Вы избежали боя, но поплатились душой. Получены ПРОКЛЯТЫЕ КРЫЛЬЯ!", type: 'error'}]);
        goToNextBattle(2, true);
      }
    } else {
      goToNextBattle(1);
    }
  };

  const handleDiceRoll = (rollResult) => {
    setDiceResult(rollResult);

    let message = "";
    if (rollResult <= 4) message = "Критический провал... Вы не пережили это событие.";
    else if (rollResult <= 8) message = "Полное исцеление!";
    else if (rollResult <= 12) message = "Время откатилось назад. Вы сразитесь с прошлым боссом снова.";
    else if (rollResult <= 16) message = "Ничего не произошло.";
    else message = "Перерождение! Вы сохраняете часть артефактов и выбираете класс заново.";

    setDiceMessage(message);

    setTimeout(() => {
      if (rollResult <= 4) {
        setGameState('gameover');
      } else if (rollResult <= 8) {
        setPlayer(p => ({...p, hp: p.maxHp}));
        goToNextBattle(1);
      } else if (rollResult <= 12) {
        goToNextBattle(0);
      } else if (rollResult <= 16) {
        goToNextBattle(1);
      } else {
        const keep = bossIndex + 1;
        const keptRelics = player.relics.slice(0, keep);
        setNgPlusRelics(keptRelics);
        setBossIndex(0);
        setGameState('class_select');
      }
    }, 4500);
  };

  const handleTreasure = (relic) => {
    setPlayer(p => {
      let newMaxHp = Math.floor(p.maxHp * 0.75);
      return {
        ...p,
        maxHp: newMaxHp,
        hp: Math.min(p.hp, newMaxHp),
        relics: [...p.relics, relic]
      };
    });
    goToNextBattle(1);
  };

  const handleForest = (choice) => {
    if (choice === 'heal') {
      setPlayer(p => ({
        ...p,
        hp: Math.min(playerStats.maxHp, p.hp + Math.floor(playerStats.maxHp * 0.2))
      }));
    } else {
      setPlayer(p => ({
        ...p,
        baseAttack: p.baseAttack + 5
      }));
    }
    goToNextBattle(1);
  };


  const handlePlayerAction = (actionType) => {
    if (isBossTurn) return;

    if (dodgeCooldown > 0) {
      setDodgeCooldown(prev => prev - 1);
    }

    let damageToBoss = 0;
    let bossActualDef = currentBoss.defense + bossTempDefense;

    if (actionType === 'attack') {
      let isCrit = (Math.random() * 100) < playerStats.critChance;
      let baseDamage = Math.max(1, playerStats.attack - bossActualDef);
      damageToBoss = isCrit ? baseDamage * 2 : baseDamage;

      addLog(`Вы атакуете! ${isCrit ? 'КРИТИЧЕСКИЙ УДАР! ' : ''}Нанесено ${damageToBoss} урона.`, 'player');

      if (playerStats.vampirism > 0 && damageToBoss > 0) {
        let healAmount = Math.floor(damageToBoss * (playerStats.vampirism / 100));
        if (healAmount > 0) {
          setPlayer(p => ({...p, hp: Math.min(playerStats.maxHp, p.hp + healAmount)}));
          addLog(`Вампиризм восстановил вам ${healAmount} ОЗ.`, 'heal');
        }
      }
    } else if (actionType === 'dodge') {
      if (!firstDodgeUsed && Math.random() < 0.5) {
        addLog("Враг предугадал уворот и контратаковал!", 'error');
        setFirstDodgeUsed(true);
        setIsBossTurn(true);
        return;
      }

      setFirstDodgeUsed(true);
      setIsDodging(true);
      setDodgeCooldown(3);
      addLog(`Вы сконцентрировались, готовясь уклониться от следующей атаки.`, 'player');

    } else if (actionType === 'build_turret') {
      setTurrets(t => t + 1);
      addLog(`Вы построили турель! Всего турелей: ${turrets + 1}.`, 'player');
    }

    let newBossHp = Math.max(0, bossHp - damageToBoss);

    setBossHp(newBossHp);

    if (newBossHp === 0) {
      handleBossDeath(currentBoss);
    } else {
      if (extraTurns > 0) {
        setExtraTurns(prev => prev - 1);
        addLog(`Используем Дополнительный Ход!`, 'system');
      } else {
        setIsBossTurn(true);
      }
    }
  };

  const ProgressBar = ({current, max, color}) => (
      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mt-1 border border-gray-600">
        <div
            className={`h-full ${color} transition-all duration-300 ease-out`}
            style={{width: `${Math.max(0, Math.min(100, (current / max) * 100))}%`}}
        />
      </div>
  );

  const RelicCard = ({relic, onClick}) => (
      <button
          onClick={() => onClick(relic)}
          className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-yellow-500 p-5 rounded-2xl transition-all transform hover:-translate-y-2 flex flex-col items-center text-center group w-full"
      >
        <div
            className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-3 text-yellow-500 group-hover:scale-110 transition-transform shadow-inner">
          {relic.icon}
        </div>
        <h3 className="text-xl font-bold mb-1">{relic.name}</h3>
        <p className="text-gray-400 text-sm mb-3">{relic.desc}</p>
        <div className="flex flex-wrap gap-1 justify-center mt-auto">
          {relic.tags?.map(tag => (
              <span key={tag} className={`text-xs px-2 py-1 rounded border ${TAG_COLORS[tag]}`}>
          {tag}
        </span>
          ))}
        </div>
      </button>
  );

  return (
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-4 flex flex-col items-center justify-center overflow-x-hidden">

        {gameState === 'menu' && (
            <div
                className="text-center max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
              <Icon name="Trophy" className="mx-auto text-yellow-500 mb-6" size={96}/>
              <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-tighter">Путь
                Героя</h1>
              <p className="text-gray-400 mb-8">Победите серию боссов, собирайте синергирующие артефакты и станьте
                легендой.</p>
              <button
                  onClick={() => setGameState('class_select')}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-900/50 text-xl"
              >
                Новая игра
              </button>
            </div>
        )}

        {gameState === 'class_select' && (
            <div className="max-w-4xl w-full">
              <h2 className="text-3xl font-black text-center mb-2 text-yellow-400 uppercase">Выберите свой путь</h2>
              <p className="text-center text-gray-400 mb-8">Каждый класс обладает уникальным стилем игры и предметами</p>
              {ngPlusRelics.length > 0 && (
                  <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-200 p-4 rounded-xl mb-6 text-center shadow-lg">
                    <Icon name="Sparkles" size={20} className="inline-block mr-2 -mt-1"/>
                    <strong>Сила перерождения:</strong> У вас сохранено артефактов из прошлой жизни ({ngPlusRelics.length} шт.). Они перейдут к новому герою!
                  </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CLASSES.map((cls, i) => (
                    <button
                        key={i}
                        onClick={() => selectClass(cls)}
                        className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-yellow-500 p-6 rounded-2xl transition-all transform hover:-translate-y-2 flex flex-col text-left group w-full"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                          <Icon name={cls.icon} size={28}/>
                        </div>
                        <h3 className="text-2xl font-bold">{cls.name}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 h-16">{cls.desc}</p>
                      <div className="mt-auto grid grid-cols-2 gap-2 text-sm bg-black/30 p-3 rounded-lg w-full">
                        <span className="text-green-400 flex items-center gap-1"><Icon name="Heart" size={14}/> {cls.hp}</span>
                        <span className="text-red-400 flex items-center gap-1"><Icon name="Sword" size={14}/> {cls.attack}</span>
                        <span className="text-blue-400 flex items-center gap-1"><Icon name="Shield" size={14}/> {cls.defense}</span>
                        {cls.thorns > 0 &&
                            <span className="text-yellow-400 flex items-center gap-1 col-span-2"><Icon name="Shield" size={14}/> {cls.thorns} Шипы</span>}
                      </div>
                    </button>
                ))}
              </div>
            </div>
        )}

        {gameState === 'event' && currentEvent && (
            <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center shadow-2xl">

              {currentEvent === 'dutchman' && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mb-6 text-gray-400 border border-gray-800">
                      <Icon name="Ghost" size={40}/>
                    </div>
                    <h2 className="text-3xl font-black text-gray-300 uppercase mb-4">Летучий Голландец</h2>
                    <p className="text-gray-400 mb-8 max-w-md">Вы замечаете в тумане призрачный корабль. Вы можете спрятаться и избежать следующего боя, но ходят слухи о страшном проклятии...</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button onClick={() => handleDutchman('skip')} className="py-3 px-6 bg-red-900 hover:bg-red-800 text-red-200 border border-red-700 font-bold rounded-xl transition-colors">
                        Спрятаться (Пропустить босса)
                      </button>
                      <button onClick={() => handleDutchman('stay')} className="py-3 px-6 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 font-bold rounded-xl transition-colors">
                        Пройти мимо
                      </button>
                    </div>
                  </div>
              )}

              {currentEvent === 'dice' && (
                  <div className="flex flex-col items-center relative z-20">
                    <h2 className="text-3xl font-black text-yellow-500 uppercase mb-2">Бросок Судьбы</h2>
                    <p className="text-gray-400 mb-2 max-w-md">Алтарь удачи предлагает вам бросить D20.<br/><b className="text-gray-300">Хватайте кубик и резко тяните в сторону!</b></p>

                    <div className={`transition-opacity duration-500 ${diceResult ? 'pointer-events-none' : ''}`}>
                      <InteractiveDice onRollComplete={handleDiceRoll} />
                    </div>

                    {diceResult !== null && (
                        <div className="absolute top-[80%] z-30 animate-fade-in flex flex-col items-center mt-6 w-full max-w-sm bg-gray-800 p-6 rounded-2xl border-2 border-yellow-600 shadow-[0_0_20px_rgba(202,138,4,0.3)]">
                          <span className="text-sm text-gray-400 uppercase tracking-widest mb-1">Результат броска</span>
                          <div className="text-7xl font-black text-yellow-400 mb-4">{diceResult}</div>
                          <p className={`text-xl font-bold ${diceResult <= 4 ? 'text-red-500' : 'text-green-400'} text-center`}>{diceMessage}</p>
                        </div>
                    )}
                  </div>
              )}

              {currentEvent === 'treasure' && (
                  <div className="flex flex-col items-center w-full">
                    <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mb-6 text-yellow-400 border border-gray-800">
                      <Icon name="Trophy" size={40}/>
                    </div>
                    <h2 className="text-3xl font-black text-yellow-400 uppercase mb-4">Проклятая Сокровищница</h2>
                    <p className="text-gray-400 mb-6">Заплатите 25% от вашего максимального здоровья, чтобы забрать один из этих артефактов.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
                      {lootOptions.map(r => (
                          <RelicCard key={r.id} relic={r} onClick={() => handleTreasure(r)}/>
                      ))}
                    </div>

                    <button onClick={() => goToNextBattle(1)} className="py-3 px-8 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-colors border border-gray-600">
                      Уйти без сокровища
                    </button>
                  </div>
              )}

              {currentEvent === 'forest' && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mb-6 text-green-500 border border-gray-800">
                      <Icon name="Map" size={40}/>
                    </div>
                    <h2 className="text-3xl font-black text-green-500 uppercase mb-4">Таинственный Лес</h2>
                    <p className="text-gray-400 mb-8 max-w-md">Вы вышли к развилке в древнем лесу. Один путь ведет к светящемуся роднику, другой — в логово дикого зверя.</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button onClick={() => handleForest('heal')} className="flex-1 py-4 px-6 bg-green-900/50 hover:bg-green-800 border border-green-700 text-green-100 font-bold rounded-xl transition-colors">
                        Пойти к роднику (+20% ОЗ)
                      </button>
                      <button onClick={() => handleForest('stat')} className="flex-1 py-4 px-6 bg-red-900/50 hover:bg-red-800 border border-red-700 text-red-100 font-bold rounded-xl transition-colors">
                        Охотиться (+5 Атаки)
                      </button>
                    </div>
                  </div>
              )}

            </div>
        )}

        {(gameState === 'start_item' || gameState === 'loot') && (
            <div className="max-w-3xl w-full">
              {gameState === 'loot' && cursedWingsAcquired && (
                  <div className="bg-red-900/50 border-2 border-red-500 text-red-200 p-4 rounded-xl mb-6 text-center shadow-lg animate-pulse flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Ghost" size={28} className="text-red-400"/>
                      <span className="text-xl font-black tracking-widest text-red-400">ПРОКЛЯТИЕ!</span>
                    </div>
                    <p>Тьма окутала вас... Вы получили <strong>Проклятые Крылья</strong>.</p>
                    <p className="text-sm opacity-80 mt-1">Дает 50% шанс полностью избежать урона, но иначе вы получаете двойной урон!</p>
                  </div>
              )}
              <h2 className="text-3xl font-black text-center mb-2 text-yellow-400 uppercase">
                {gameState === 'start_item' ? 'Дар Богов' : 'Трофеи'}
              </h2>
              <p className="text-center text-gray-400 mb-8">
                {gameState === 'start_item' ? 'Выберите стартовый предмет' : 'Соберите 2 предмета одного типа для Синергии!'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lootOptions.map((relic, i) => (
                    <RelicCard key={i} relic={relic}
                               onClick={(r) => applyRelicAndContinue(r, gameState === 'start_item')}/>
                ))}
              </div>
            </div>
        )}

        {gameState === 'playing' && currentBoss && (
            <div
                className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl flex flex-col h-[85vh] min-h-[600px] max-h-[850px] overflow-hidden">

              <div className="flex border-b border-gray-800 shrink-0 bg-gray-950">
                <button
                    onClick={() => setActiveTab('battle')}
                    className={`flex-1 py-4 font-bold text-center transition-colors flex justify-center items-center gap-2 ${activeTab === 'battle' ? 'bg-gray-800 text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:bg-gray-800/50'}`}
                >
                  <Icon name="Sword" size={18}/> Бой с боссом
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`flex-1 py-4 font-bold text-center transition-colors flex justify-center items-center gap-2 ${activeTab === 'stats' ? 'bg-gray-800 text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:bg-gray-800/50'}`}
                >
                  <Icon name="Info" size={18}/> Герой и Инвентарь
                </button>
              </div>

              <div className="flex-1 overflow-hidden relative bg-gray-950">
                {activeTab === 'battle' && (
                    <div className="h-full flex flex-col p-4 gap-4">
                      <div
                          className={`shrink-0 border p-5 rounded-2xl shadow-md flex flex-col ${currentBoss.bg} border-opacity-30 border-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Icon name="Skull" size={100}/>
                        </div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-1">
                            <h2 className={`text-2xl font-black ${currentBoss.color} uppercase`}>
                              {currentBoss.name}
                            </h2>
                            <span className="bg-black/50 px-2 py-1 rounded text-xs font-bold border border-gray-600">
                      Ход {turnCounter}
                    </span>
                          </div>
                          <p className="text-xs text-gray-300 mb-4">Этап {bossIndex + 1} / {BOSSES.length}</p>

                          <div className="mb-4">
                            <div className="flex justify-between font-bold text-lg mb-1">
                              <span className="text-gray-300">ОЗ Босса</span>
                              <span className={currentBoss.color}>{bossHp} / {currentBoss.maxHp}</span>
                            </div>
                            <ProgressBar current={bossHp} max={currentBoss.maxHp} color="bg-red-600"/>
                          </div>

                          <div
                              className="flex gap-4 text-sm bg-black/40 p-2 px-3 rounded-lg w-max border border-gray-800 font-mono">
                            <div className="flex items-center gap-1 text-gray-300">
                              <Icon name="Sword" size={14} className="text-red-400"/> {currentBoss.attack}
                            </div>
                            <div className="flex items-center gap-1 text-gray-300">
                              <Icon name="Shield" size={14}
                                    className="text-blue-400"/> {currentBoss.defense}{bossTempDefense > 0 && `(+${bossTempDefense})`}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                          className="flex-1 bg-black/60 border border-gray-800 rounded-xl p-3 overflow-y-auto font-mono text-sm shadow-inner flex flex-col">
                        {logs.length === 0 &&
                            <p className="text-gray-600 italic text-center my-auto">Бой начинается...</p>}
                        {logs.map((log) => (
                            <div key={log.id} className={`mb-1 ${
                                log.type === 'player' ? 'text-blue-300' :
                                    log.type === 'boss' ? 'text-red-400' :
                                        log.type === 'heal' ? 'text-green-400' :
                                            log.type === 'victory' ? 'text-yellow-400 font-bold mt-2' :
                                                log.type === 'error' ? 'text-purple-400 font-bold' :
                                                    'text-gray-300'
                            }`}>
                              {'>'} {log.message}
                            </div>
                        ))}
                        {isBossTurn && <div className="text-gray-500 animate-pulse mt-2">{'>'} Босс думает...</div>}
                        <div ref={logsEndRef}/>
                      </div>

                      <div
                          className="shrink-0 flex flex-col gap-3 bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-lg">
                        <div>
                          <div className="flex justify-between font-bold text-sm mb-1">
                    <span className="text-gray-300 flex items-center gap-1 uppercase tracking-tight">
                      <Icon name="Heart" size={14} className="text-green-400"/> Герой
                      {player.healPotions > 0 && <span className="text-green-400 ml-2 flex items-center text-xs bg-green-900/40 px-2 py-0.5 rounded border border-green-700/50"><Icon name="Package" size={12} className="mr-1"/> x{player.healPotions}</span>}
                      {extraTurns > 0 &&
                          <span className="text-yellow-400 font-bold ml-2 animate-pulse">Доп. Ход!</span>}
                    </span>
                            <span className={player.hp < playerStats.maxHp * 0.3 ? 'text-red-500' : 'text-green-400'}>
                      {player.hp} / {playerStats.maxHp}
                    </span>
                          </div>
                          <ProgressBar current={player.hp} max={playerStats.maxHp} color="bg-green-500"/>
                        </div>

                        <div
                            className={`grid ${player.classId === 'engineer' ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                          <button disabled={isBossTurn} onClick={() => handlePlayerAction('attack')}
                                  className="bg-red-600 hover:bg-red-500 disabled:opacity-50 p-2 rounded-lg font-bold flex flex-col items-center justify-center transition-colors shadow-lg h-14 sm:h-16 text-xs sm:text-sm uppercase">
                            <Icon name="Sword" size={20} className="mb-1"/> Атака
                          </button>
                          <button disabled={isBossTurn || dodgeCooldown > 0}
                                  onClick={() => handlePlayerAction('dodge')}
                                  className={`p-2 rounded-lg font-bold flex flex-col items-center justify-center transition-colors shadow-lg h-14 sm:h-16 text-xs sm:text-sm disabled:opacity-50 uppercase ${dodgeCooldown === 0 ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-700 text-gray-400'}`}>
                            <Icon name="Wind" size={20}
                                  className="mb-1"/> {dodgeCooldown > 0 ? `КД: ${dodgeCooldown}` : 'Уворот'}
                          </button>
                          {player.classId === 'engineer' && (
                              <button disabled={isBossTurn} onClick={() => handlePlayerAction('build_turret')}
                                      className="bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 p-2 rounded-lg font-bold flex flex-col items-center justify-center transition-colors shadow-lg h-14 sm:h-16 text-xs sm:text-sm uppercase">
                                <Icon name="Wrench" size={20} className="mb-1"/> Турель
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="h-full overflow-y-auto p-5 sm:p-6 bg-gray-900 flex flex-col gap-6">
                      <div
                          className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                        <div
                            className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-700">
                          <Icon name={CLASSES.find(c => c.id === player.classId)?.icon || "Shield"} size={32}
                                className="text-blue-400"/>
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-white">{CLASSES.find(c => c.id === player.classId)?.name}</h2>
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Icon name="Heart" size={14}
                                  className="text-green-500"/> {player.hp} / {playerStats.maxHp} ОЗ
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3 text-gray-300 border-b border-gray-800 pb-2 uppercase tracking-tighter">Характеристики</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-black/30 p-3 rounded-xl border border-gray-800 flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold mb-1">Атака</span>
                            <span className="text-xl text-red-400 flex items-center gap-2"><Icon name="Sword"
                                                                                                 size={20}/> {playerStats.attack}</span>
                          </div>
                          <div className="bg-black/30 p-3 rounded-xl border border-gray-800 flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold mb-1">Защита</span>
                            <span
                                className={`text-xl flex items-center gap-2 ${playerStats.defense < 0 ? 'text-purple-400' : 'text-blue-400'}`}><Icon
                                name="Shield" size={20}/> {playerStats.defense}</span>
                          </div>
                          <div className="bg-black/30 p-3 rounded-xl border border-gray-800 flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold mb-1">Крит</span>
                            <span className="text-xl text-orange-400 flex items-center gap-2"><Icon name="Zap"
                                                                                                    size={20}/> {playerStats.critChance}%</span>
                          </div>
                          <div className="bg-black/30 p-3 rounded-xl border border-gray-800 flex flex-col">
                            <span className="text-gray-500 text-xs uppercase font-bold mb-1">Вампир</span>
                            <span className="text-xl text-rose-400 flex items-center gap-2"><Icon name="Droplets"
                                                                                                  size={20}/> {playerStats.vampirism}%</span>
                          </div>
                          {playerStats.thorns > 0 && (
                              <div
                                  className="bg-black/30 p-3 rounded-xl border border-gray-800 flex flex-col col-span-2">
                                <span className="text-gray-500 text-xs uppercase font-bold mb-1">Шипы</span>
                                <span className="text-xl text-yellow-400 flex items-center gap-2"><Icon name="Shield"
                                                                                                        size={20}/> {playerStats.thorns}</span>
                              </div>
                          )}
                          {player.classId === 'engineer' && turrets > 0 && (
                              <div
                                  className="bg-cyan-900/20 p-3 rounded-xl border border-cyan-800 flex flex-col col-span-2">
                                <span className="text-cyan-500 text-xs uppercase font-bold mb-1">Турели</span>
                                <span className="text-xl text-cyan-400 flex items-center gap-2"><Icon name="Wrench"
                                                                                                      size={20}/> {turrets} шт. (по {5 + playerStats.turretDamage} урона)</span>
                              </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3 text-gray-300 border-b border-gray-800 pb-2 uppercase tracking-tighter">Инвентарь
                          ({player.relics.length})</h3>
                        <div
                            className="flex flex-wrap gap-2 bg-black/20 p-3 rounded-xl border border-gray-800 min-h-[64px]">
                          {player.relics.length === 0 &&
                              <span className="text-sm text-gray-600 my-auto ml-1 italic">Пусто.</span>}
                          {player.relics.map((relic, i) => (
                              <div
                                  key={i}
                                  className="relative w-12 h-12 bg-gray-800 border-2 border-gray-700 hover:border-yellow-500 rounded-xl flex items-center justify-center text-yellow-500 cursor-help group transition-colors"
                              >
                                {relic.icon}
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-gray-900 border border-gray-700 text-white text-xs rounded-lg p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                                  <p className="font-bold text-yellow-400 mb-1">{relic.name}</p>
                                  <p className="text-gray-300">{relic.desc}</p>
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>

                      {playerStats.activeSynergies.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-lg font-bold mb-3 text-yellow-500 border-b border-gray-800 pb-2 flex items-center gap-2 uppercase tracking-tighter">
                              <Icon name="Sparkles" size={18}/> Синергии
                            </h3>
                            <div className="flex flex-col gap-2">
                              {playerStats.activeSynergies.map((syn, idx) => (
                                  <div key={idx}
                                       className="bg-yellow-900/20 border border-yellow-700/50 p-3 rounded-xl flex justify-between items-center shadow-sm">
                                    <span className="text-gray-200 font-bold">{syn.name}</span>
                                    <span
                                        className="text-yellow-400 bg-yellow-900/40 px-2 py-1 rounded text-sm font-bold">{syn.effect}</span>
                                  </div>
                              ))}
                            </div>
                          </div>
                      )}
                    </div>
                )}
              </div>
            </div>
        )}

        {gameState === 'gameover' && (
            <div
                className="text-center max-w-md w-full bg-red-950/80 p-8 rounded-2xl shadow-2xl border border-red-900">
              <Icon name="Skull" className="mx-auto text-red-500 mb-6" size={96}/>
              <h1 className="text-4xl font-black mb-4 text-red-400 uppercase tracking-tighter">Вы погибли</h1>
              <p className="text-gray-300 mb-8 font-mono">Пройдено боссов: {bossIndex} из {BOSSES.length}</p>
              <button
                  onClick={() => setGameState('menu')}
                  className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Icon name="RefreshCcw" size={20}/> В главное меню
              </button>
            </div>
        )}

        {gameState === 'victory' && (
            <div
                className="text-center max-w-md w-full bg-yellow-950/40 p-8 rounded-2xl shadow-2xl border border-yellow-700">
              <Icon name="Trophy" className="mx-auto text-yellow-400 mb-6" size={96}/>
              <h1 className="text-4xl font-black mb-4 text-yellow-400 uppercase tracking-tighter">Победа</h1>
              <p className="text-gray-300 mb-6 font-mono">Вы повергли всех боссов!</p>
              <div className="bg-black/50 p-4 rounded-lg text-left mb-6 font-mono text-sm">
                <p className="text-gray-400 mb-2">Финальные параметры:</p>
                <p>Атака: <span className="text-red-400">{playerStats.attack}</span></p>
                <p>Защита: <span className="text-blue-400">{playerStats.defense}</span></p>
                <p className="text-xs text-gray-500 mt-2">Предметов собрано: {player.relics.length}</p>
              </div>
              <button
                  onClick={() => setGameState('menu')}
                  className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all shadow-lg text-xl"
              >
                Сыграть ещё раз
              </button>
            </div>
        )}
      </div>
  );
}