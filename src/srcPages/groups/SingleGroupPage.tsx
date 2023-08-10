import BackButton from "@/src/components/general/BackButton";
import { Group } from "@/src/interfaces";

interface SingleGroupPageProps {
  group: Group;
}

const SingleGroupPage = ({ group }: SingleGroupPageProps) => {
  return (
    <div>
      <BackButton href="/settings" />
      <div>{group.name}</div>
    </div>
  );
};

export default SingleGroupPage;
