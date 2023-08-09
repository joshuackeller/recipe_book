import { Group } from "@/src/interfaces";

interface SingleGroupPageProps {
  group: Group;
}

const SingleGroupPage = ({ group }: SingleGroupPageProps) => {
  return (
    <div>
      <div>{group.name}</div>
    </div>
  );
};

export default SingleGroupPage;
