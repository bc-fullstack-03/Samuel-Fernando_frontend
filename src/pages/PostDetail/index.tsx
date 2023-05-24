import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainScreen from '../../components/MainScreen';
import PostDetailItem from '../../components/PostDetailItem';
import { Post } from '../../models/Post';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';

function PostDetail() {
  const [post, setPost] = useState<Post>();
  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await api.get(`/post/${postId}`, getAuthHeader());
        setPost(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao buscar os dados do Post');
      }
    }

    getPost();
  }, [postId]);

  return (
    <div>
      <MainScreen>
        {post && <PostDetailItem post={post} setPostDetail={setPost} />}
      </MainScreen>
    </div>
  );
}

export default PostDetail;
