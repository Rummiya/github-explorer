import { useParams } from 'react-router-dom';
import { CurrentRepos } from '../features/repos/components/CurrentRepos';
import { UserRepos } from '../features/repos/components/UserRepos';

export const Repositories = () => {
	const { id } = useParams();

	return <>{id ? <UserRepos id={id} /> : <CurrentRepos />}</>;
};
