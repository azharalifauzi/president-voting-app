import { GridItem, Image, AspectRatio, GridItemProps, Text, Button } from '@chakra-ui/react';

interface PresidentCardProps extends GridItemProps {
  onVote?: () => void;
  src: string;
  text?: string;
  buttonText?: string;
  count?: number;
}

const PresidentCard: React.FC<PresidentCardProps> = ({
  justifySelf,
  src,
  text,
  buttonText,
  onVote,
  count,
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
        {count}
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
