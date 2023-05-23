import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import Feed from '../../components/Feed';
import MainScreen from '../../components/MainScreen';
import { Post } from '../../models/Post';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await api.get(`/feed?page=${page}`, getAuthHeader());
        setHasMore(data.pageableResponse.hasNext);
        setPosts([...posts, ...data.postResponse]);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter o feed');
      }
    }

    getPosts();
  }, [page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  function postCreated(post: Post) {
    setPosts([post, ...posts]);
  }

  return (
    <MainScreen postCreated={postCreated}>
      <Feed
        posts={posts}
        loadMorePosts={loadMorePosts}
        hasMorePosts={hasMore}
      />
    </MainScreen>
  );
}

export default Home;
