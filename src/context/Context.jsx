import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompt, setPrevPrompt] = useState([]); // Stores the recent prompts
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const formatResponse = (response) => {
    let formattedResponse = response;

    formattedResponse = formattedResponse
      .split('**')
      .map((part, index) => (index % 2 === 1 ? `<b>${part}</b>` : part))
      .join('');

    formattedResponse = formattedResponse.split('*').join('<br/>');
    formattedResponse = formattedResponse.split(':').join(':<br/>');
    formattedResponse = formattedResponse
      .split('_')
      .map((part, index) => (index % 2 === 1 ? `<i>${part}</i>` : part))
      .join('');

    return formattedResponse;
  };

  const onSent = async (prompt = null) => {
    const activePrompt = prompt || input; // Use the provided prompt or the current input
    if (!activePrompt) return; // Avoid processing empty prompts

    if (!prompt) setPrevPrompt((prev) => [...prev, activePrompt]); // Save to history only if it's a new input
    setRecentPrompt(activePrompt);
    setShowResult(true);
    setLoading(true);

    try {
      const response = await run(activePrompt);
      const formattedResponse = formatResponse(response);

      setResultData(''); // Clear previous result
      const responseArray = formattedResponse.split(' ');

      // Simulate typing effect
      for (let i = 0; i < responseArray.length; i++) {
        const nextWord = responseArray[i];
        delayPara(i, nextWord + ' ');
      }
    } catch (error) {
      setResultData('Error processing prompt.');
    } finally {
      setLoading(false);
      setInput(''); // Clear input after sending
    }
  };

  const contextValue = {
    onSent,
    prevPrompt,
    setPrevPrompt,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
    setResultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
