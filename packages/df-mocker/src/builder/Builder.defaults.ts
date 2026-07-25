export const defaults = {
  users: {
    schema: {
      "id": "$i",
      "name": "{{person.fullName}}",
      "username": "{{internet.username}}",
      "email": "{{internet.email}}",
      "address": {
        "addressLine1": "{{location.streetAddress}}",
        "addressLine2": "{{location.secondaryAddress}}",
        "city": "{{location.city}}",
        "zip": "{{location.zipCode}}",
        "geo": {
          "lat": "{{location.latitude}}",
          "long": "{{location.longitude}}"
        }
      },
      "phone": "{{phone.number}}",
      "website": "{{internet.domainName}}",
      "company": {
        "name": "{{company.name}}",
        "catchPhrase": "{{company.catchPhraseDescriptor}}",
        "bs": "{{company.buzzAdjective}}"
      }
    },
    count: 250
  },
  posts: {
    schema: {
      "id": "$i",
      "userId": "$random(type: connection, object: users)",
      "title": "{{lorem.sentence}}",
      "body": "{{lorem.paragraph}}"
    },
    count: 1000
  },
  comments: {
    schema: {
      "postId": "$random(type: connection, object: posts)",
      "id": "$i",
      "name": "{{internet.username}}",
      "email": "{{internet.email}}",
      "body": "{{lorem.paragraph}}"
    },
    count: 500
  },
  albums: {
    schema: {
      "userId": "$random(type: connection, object: albums)",
      "id": "$i",
      "title": "{{lorem.sentence}}"
    },
    count: 100
  },
  photos: {
    schema: {
      "albumId": "$random(type: connection, object: albums)",
      "id": "$i",
      "title": "{{lorem.sentence}}",
      "url": "https://via.placeholder.com/600/",
      "thumbnailUrl": "https://via.placeholder.com/150/"
    },
    count: 100
  }
}