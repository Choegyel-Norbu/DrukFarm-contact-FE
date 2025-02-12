import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Card, Avatar} from 'react-native-paper';
export default function Feeds() {
  const handleLike = postId => {
    console.log(`Liked post ${postId}`);
  };

  const handleComment = postId => {
    console.log(`Comment on post ${postId}`);
  };

  const handleShare = postId => {
    console.log(`Shared post ${postId}`);
  };
  const post = [
    {
      id: 1,
      user: {
        name: 'Tashi',
        avatar: require('../images/chats.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/wasp.jpg'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 2,
      user: {
        name: 'Chogyal',
        avatar: require('../images/donate.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/post.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },

    {
      id: 3,
      user: {
        name: 'Wasp',
        avatar: require('../images/wasp.jpg'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 4,
      user: {
        name: 'Wasp',
        avatar: require('../images/post2.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 5,
      user: {
        name: 'Wasp',
        avatar: require('../images/post2.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 6,
      user: {
        name: 'Wasp',
        avatar: require('../images/post2.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 7,
      user: {
        name: 'Wasp',
        avatar: require('../images/post2.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
    {
      id: 8,
      user: {
        name: 'Wasp',
        avatar: require('../images/post2.png'),
      },
      content: {
        text: 'Check out this amazing book donation drive!',
        image: require('../images/donate.png'),
      },
      timestamp: '2h ago',
      likes: 120,
      comments: 45,
      shares: 10,
    },
  ];

  return (
    <View style={styles.contentFeaturesDemo}>
      <View style={styles.feedContainer}>
        {post.map(item => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.user.name}
              subtitle={item.timestamp}
              left={props => (
                <Avatar.Image {...props} source={item.user.avatar} />
              )}
            />
            <Card.Content>
              <Text>{item.content.text}</Text>
              {item.content.image && (
                <Image source={item.content.image} style={styles.postImage} />
              )}
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity
                onPress={() => handleLike(item.id)}
                style={styles.actionButton}>
                <Icon name="favorite-outline" size={24} color="#666" />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleComment(item.id)}
                style={styles.actionButton}>
                <Icon name="comment" size={24} color="#666" />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(item.id)}
                style={styles.actionButton}>
                <Icon name="share" size={24} color="#666" />
                <Text style={styles.actionText}>{item.shares}</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentFeaturesDemo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap',
    borderRadius: 20,
    paddingTop: 20,
    transform: [{translateX: 0}, {translateY: -40}],
  },

  feedContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },

  card: {
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 0,
    elevation: 3,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});
