import Directory from '../../components/directory/directory.component';
import './categories.styles.scss';

const Home = () => {
  const categories = require('../../components/categories/categories.json');
  return <Directory categories={categories} />
}

export default Home;
