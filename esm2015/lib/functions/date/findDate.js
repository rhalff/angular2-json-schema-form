export function findDate(text) {
    if (!text) {
        return null;
    }
    let foundDate;
    foundDate = text.match(/(?:19|20)\d\d[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:[012]?\d|3[01])(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    foundDate = text.match(/(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:19|20)\d\d(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    foundDate = text.match(/^(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ]\d\d(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    foundDate = text.match(/^\d\d[-_\\\/\. ](?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    foundDate = text.match(/^(?:19|20)\d\d(?:0\d|1[012])(?:[012]\d|3[01])/);
    if (foundDate) {
        return foundDate[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZERhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvZGF0ZS9maW5kRGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQUk7SUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLFNBQWdCLENBQUE7SUFFcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQTtJQUNwRyxJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO0lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQTtJQUNwRyxJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO0lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtJQUM1RixJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO0lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtJQUM1RixJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO0lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQTtJQUN2RSxJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogJ2ZpbmREYXRlJyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZERhdGUodGV4dCk6IHN0cmluZyB7XG4gIGlmICghdGV4dCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgbGV0IGZvdW5kRGF0ZTogYW55W11cbiAgLy8gTWF0Y2ggLi4uWVlZWS1NTS1ERC4uLlxuICBmb3VuZERhdGUgPSB0ZXh0Lm1hdGNoKC8oPzoxOXwyMClcXGRcXGRbLV9cXFxcXFwvXFwuIF0oPzowP1xcZHwxWzAxMl0pWy1fXFxcXFxcL1xcLiBdKD86WzAxMl0/XFxkfDNbMDFdKSg/IVxcZCkvKVxuICBpZiAoZm91bmREYXRlKSB7XG4gICAgcmV0dXJuIGZvdW5kRGF0ZVswXVxuICB9XG4gIC8vIE1hdGNoIC4uLk1NLURELVlZWVkuLi5cbiAgZm91bmREYXRlID0gdGV4dC5tYXRjaCgvKD86WzAxMl0/XFxkfDNbMDFdKVstX1xcXFxcXC9cXC4gXSg/OjA/XFxkfDFbMDEyXSlbLV9cXFxcXFwvXFwuIF0oPzoxOXwyMClcXGRcXGQoPyFcXGQpLylcbiAgaWYgKGZvdW5kRGF0ZSkge1xuICAgIHJldHVybiBmb3VuZERhdGVbMF1cbiAgfVxuICAvLyBNYXRjaCBNTS1ERC1ZWS4uLlxuICBmb3VuZERhdGUgPSB0ZXh0Lm1hdGNoKC9eKD86WzAxMl0/XFxkfDNbMDFdKVstX1xcXFxcXC9cXC4gXSg/OjA/XFxkfDFbMDEyXSlbLV9cXFxcXFwvXFwuIF1cXGRcXGQoPyFcXGQpLylcbiAgaWYgKGZvdW5kRGF0ZSkge1xuICAgIHJldHVybiBmb3VuZERhdGVbMF1cbiAgfVxuICAvLyBNYXRjaCBZWS1NTS1ERC4uLlxuICBmb3VuZERhdGUgPSB0ZXh0Lm1hdGNoKC9eXFxkXFxkWy1fXFxcXFxcL1xcLiBdKD86WzAxMl0/XFxkfDNbMDFdKVstX1xcXFxcXC9cXC4gXSg/OjA/XFxkfDFbMDEyXSkoPyFcXGQpLylcbiAgaWYgKGZvdW5kRGF0ZSkge1xuICAgIHJldHVybiBmb3VuZERhdGVbMF1cbiAgfVxuICAvLyBNYXRjaCBZWVlZTU1ERC4uLlxuICBmb3VuZERhdGUgPSB0ZXh0Lm1hdGNoKC9eKD86MTl8MjApXFxkXFxkKD86MFxcZHwxWzAxMl0pKD86WzAxMl1cXGR8M1swMV0pLylcbiAgaWYgKGZvdW5kRGF0ZSkge1xuICAgIHJldHVybiBmb3VuZERhdGVbMF1cbiAgfVxufVxuIl19