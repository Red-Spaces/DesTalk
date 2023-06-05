export const scrollToBottom = (bottomOfChatRef) => {
  const chatContainer = bottomOfChatRef.current.parentNode;
  const { scrollHeight, clientHeight } = chatContainer;
  const maxScrollTop = scrollHeight - clientHeight;
  let currentScrollTop = chatContainer.scrollTop;
  const step = Math.ceil((maxScrollTop - currentScrollTop) / 10);

  const scroll = () => {
    currentScrollTop += step;
    chatContainer.scrollTop = currentScrollTop;

    if (currentScrollTop < maxScrollTop) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};
