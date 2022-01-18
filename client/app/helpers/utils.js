export function count_words_in_markdown(markdown) {
    let text = markdown;
    // Comments
    text = text.replace(/<!--(.*?)-->/gm, '');
    // Tabs to spaces
    text = text.replaceAll('\t', '')
    // More than 1 space to 4 spaces
    text = text.replace(/[ ]{2,}/g, '    ')
    // Footnotes
    text = text.replace(/^\[[^]]*\][^(].*/mg, '')
    // Indented blocks of code
    text = text.replace(/^( {4,}[^-*]).*/mg, '')
    // Custom header IDs
    text = text.replace(/{#.*}/g, '')
    // Replace newlines with spaces for uniform handling
    text = text.replaceAll('\n', ' ')
    // Remove images
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Remove HTML tags
    text = text.replace(/<\/?[^>]*>/g, '')
    //Remove special characters
    text = text.replace(/[#*`~\-–^=<>+|/:]/g, '')
    // Remove footnote references
    text = text.replace(/\[[0-9]*\]/, '')
    // Remove enumerations
    text = text.replace(/[0-9#]*\./, '')
  console.log(text);
    return text.trim(' ').split(' ').length
}