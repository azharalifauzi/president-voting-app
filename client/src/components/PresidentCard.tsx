import { GridItem, Image, AspectRatio, GridItemProps, Text, Button } from '@chakra-ui/react';

interface PresidentCardProps extends GridItemProps {
  onVote?: () => void;
  src: string;
  text?: string;
  buttonText?: string;
}

const PresidentCard: React.FC<PresidentCardProps> = ({
  justifySelf,
  src,
  text,
  buttonText,
  onVote,
}) => {
  return (
    <GridItem
      display="flex"
      flexDir="column"
      justifyContent="center"
      w="96"
      justifySelf={justifySelf}
    >
      <Text textAlign="center" fontWeight="semibold" fontSize="3xl" mb="6">
        12
      </Text>
      <AspectRatio borderRadius="50%" overflow="hidden" ratio={1}>
        <Image src={src} alt="Candidate One" />
      </AspectRatio>
      <Text textAlign="center" fontWeight="semibold" my="6">
        {text}
      </Text>
      <Button onClick={onVote} colorScheme="twitter">
        {buttonText}
      </Button>
    </GridItem>
  );
};

export default PresidentCard;
