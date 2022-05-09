type SpacerProps = {
  width: string;
  height: string;
};

function Spacer({ width, height }: SpacerProps) {
  return (
    <span
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    />
  );
}

export default Spacer;
