import DynamicPage from './DynamicPage.jsx';

export default function MongoPageRoute({ slug, fallback }) {
  return <DynamicPage slug={slug} fallback={fallback} />;
}
