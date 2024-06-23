// utils/position.js
export function calculateAvatarPosition(coord, sceneWidth, sceneHeight, avatarSize, isActive, mode) {
  let size = avatarSize;
  if (isActive && mode === 'game') {
    size *= 1.5; // Agrandir de 50% si actif et en mode jeu
  }

  const adjustedX = coord.x * (sceneWidth - avatarSize);
  const adjustedY = coord.y * (sceneHeight - avatarSize);

  return {
    top: `calc(${adjustedY}px + ${avatarSize / 2}px - ${size / 2}px)`,
    left: `calc(${adjustedX}px + ${avatarSize / 2}px - ${size / 2}px)`,
    size: `${size}px`
  };
}
