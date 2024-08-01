<script>
const wordsPerMinute = 250;
const secondsPerImage = 10;

const cards = document.querySelectorAll (".blog_item");

for (const card of cards) {
const blogPostHome = card.querySelector(".blog-post");
const words = blogPostHome.textContent.split(" ").length;
const images = blogPostHome.getElementsByTagName("img").length;

const totalMinutes = Math.floor((words /wordsPerMinute) + (images * secondsPerImage / 60));
const totalSeconds = (words / wordsPerMinute) * 60 + (images * secondsPerImage);

const readTimeDiv = card.querySelector(".blog_readtime");

if (totalSeconds < 60) {
    readTimeDiv.textContent = `1 min read`;
} else if (totalMinutes === 1) {
    readTimeDiv.textContent = `1 min read`;
}
} else {
    readTimeDiv.textContent = `${totalMinutes} min read`;
}
</script>