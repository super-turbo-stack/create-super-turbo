interface Props {
  reactName: string;
  nextName: string;
  expressName: string;
}

export const checkConflictingAppNames = ({
  reactName,
  expressName,
  nextName,
}: Props): Props => {
  if (
    expressName === nextName &&
    reactName === nextName &&
    expressName === reactName
  ) {
    expressName = `${expressName}-express-app`;
    nextName = `${nextName}-next-app`;
    reactName = `${reactName}-react-app`;
  } else if (reactName === expressName) {
    expressName = `${expressName}-express-app`;
    reactName = `${reactName}-react-app`;
  } else if (reactName === nextName) {
    reactName = `${reactName}-react-app`;
    nextName = `${nextName}-next-app`;
  } else if (expressName === nextName) {
    nextName = `${nextName}-next-app`;
    expressName = `${expressName}-express-app`;
  }
  return {
    reactName,
    nextName,
    expressName,
  };
};
