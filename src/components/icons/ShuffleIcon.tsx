export const ShuffleIcon = ({
  size = undefined,
  color = "#000000",
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  className = "",
  scale = 1.1, // <— use 0.95–1.1 to taste
}) => {
  const transforms: string[] = [];
  if (rotation) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");
  if (scale !== 1) transforms.push(`scale(${scale})`);

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1 1 15 14"
      width={size}
      height={size}
      fill="none"
      style={{
        opacity,
        transform: transforms.join(" ") || undefined,
        transformOrigin: "center",
        filter:
          shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
      }}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932a.75.75 0 0 1-1.3-.75a6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75m-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932a.75.75 0 0 1 1.025-.273"
        clipRule="evenodd"
      />
    </svg>
  );
};
