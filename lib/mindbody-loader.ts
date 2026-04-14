const loadMBody = (callback?: () => void) => {
  const existingScript = document.getElementById('mindBody');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.id = 'mindBody';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => { if (callback) callback(); };
  }
  if (existingScript && callback) callback();
};
export default loadMBody;
