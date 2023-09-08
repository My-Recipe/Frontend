import TopNav from '@copmonents/TopNav';
const user = { name: '김준수', email: 'chocoboy0508@gmail.com' };
function navi() {
  return <TopNav user={user} />;
}

export default navi;
