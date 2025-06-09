import React from 'react';
import { FiInstagram } from 'react-icons/fi';

const InstagramFeed = () => {
  const posts = [
    {
      id: 1,
      image: '/images/instagram/post1.jpg',
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      image: '/images/instagram/post2.jpg',
      likes: 187,
      comments: 8,
    },
    {
      id: 3,
      image: '/images/instagram/post3.jpg',
      likes: 342,
      comments: 15,
    },
    {
      id: 4,
      image: '/images/instagram/post4.jpg',
      likes: 421,
      comments: 23,
    },
    {
      id: 5,
      image: '/images/instagram/post5.jpg',
      likes: 156,
      comments: 7,
    },
    {
      id: 6,
      image: '/images/instagram/post6.jpg',
      likes: 289,
      comments: 14,
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Follow Us on Instagram
          </h2>
          <a
            href="https://instagram.com/sareeshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-medium flex items-center justify-center"
          >
            <FiInstagram className="w-5 h-5 mr-2" />
            @sareeshop
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-medium">{post.likes} likes</p>
                  <p className="font-medium">{post.comments} comments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
