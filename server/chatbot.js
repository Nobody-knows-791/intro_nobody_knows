const characters = {
    1: {
      name: 'Step-Sister',
      tone: 'playful',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGD4z8AARgABZcM5AAAAAElFTkSuQmCC',
      responses: [
        { trigger: 'hey', response: 'Yo, what’s up? Just chilling in my room!' },
        { trigger: 'how are you', response: 'Like, totally awesome! You?' },
        { trigger: 'pic', response: { text: 'Hehe, here’s a sneaky pic!', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGD4z8AARgABZcM5AAAAAElFTkSuQmCC' } },
        { default: 'Hmm, what’s that? Spill the tea!' },
      ],
    },
    2: {
      name: 'Step-Mom',
      tone: 'caring',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8AQDABzQAF3y5kXAAAAAElFTkSuQmCC',
      responses: [
        { trigger: 'hey', response: 'Hello, dear! How’s my favorite person?' },
        { trigger: 'how are you', response: 'Just keeping the house cozy. You okay?' },
        { trigger: 'pic', response: { text: 'Oh, you want a pic? Here’s one!', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8AQDABzQAF3y5kXAAAAAElFTkSuQmCC' } },
        { default: 'I’m always here for you, sweetie.' },
      ],
    },
    3: {
      name: 'Aunt',
      tone: 'fun',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkwMDwHwAABQECdZxXAAAAAElFTkSuQmCC',
      responses: [
        { trigger: 'hey', response: 'Hey there! Ready for some fun with your cool aunt?' },
        { trigger: 'how are you', response: 'Living my best life! You?' },
        { trigger: 'pic', response: { text: 'Check out this vibe!', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkwMDwHwAABQECdZxXAAAAAElFTkSuQmCC' } },
        { default: 'Come on, tell me something juicy!' },
      ],
    },
    4: {
      name: 'Hot Neighbor',
      tone: 'flirty',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYGD4DwABBAEAH2kTAAAAAElFTkSuQmCC',
      responses: [
        { trigger: 'hey', response: 'Well, hello, neighbor! Looking good!' },
        { trigger: 'how are you', response: 'Feeling hot today, how ‘bout you? 😉' },
        { trigger: 'pic', response: { text: 'Here’s a little something for you!', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYGD4DwABBAEAH2kTAAAAAElFTkSuQmCC' } },
        { default: 'So, what’s the vibe today?' },
      ],
    },
  };
  
  function getBotResponse(characterId, message) {
    const character = characters[characterId];
    if (!character) return { text: 'Whoops, something went wrong!' };
  
    const msg = message.toLowerCase();
    const response = character.responses.find((r) => msg.includes(r.trigger)) || character.responses.find((r) => r.default);
    return response.response || { text: response.default };
  }
  
  module.exports = { getBotResponse };