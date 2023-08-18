import { useNavigate } from 'react-router-dom';

export interface IndexProps {}

function Index({ ...props }: IndexProps) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        go to home
      </button>
    </>
  );
}

export default Index;
