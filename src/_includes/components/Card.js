const { DateTime } = require("luxon");

module.exports = (post) => {
  const htmlDateTime = DateTime.fromJSDate(post.date, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  // const date = DateTime.fromJSDate(post.date, {zone: 'utc'}).toFormat('dd LLL yyyy');
  // const url =
  return `
    <article class="post-card u-mb1" aria-label="${post.data.title}">
      <p>Date is: ${post.date}</p>
      <p>Readable date is: ${htmlDateTime}</p>
      <p>URL IS: ${post.url}</p>
    </article>
  `;
};

      // <p>Filtered URL IS: ${eleventyConfig.getFilter("url")(url)}</p>


// <article class="post-card u-mb1" aria-label="${post.data.title}">
//   <div class="post-card__inner">
//     <p class="post-card__info">
//       <time class="post-card__date text_small" datetime="${htmlDateTime}">${postDate}</time>
//       |
//       {% for tag in post.data.tags %}
//         {%- if collections.tagList.indexOf(tag) != -1 -%}
//           {% set tagUrl %}/{{ tag }}/{% endset %}
//           <a href="{{ tagUrl | url }}" class="post-card__tag see-more__item">
//             #{{ tag }}
//             {%- if not loop.last -%}
//             ,
//             {%- endif -%}
//           </a>
//         {%- endif -%}
//       {% endfor %}
//     </p>

//     <a href="{{ post.url | url }}" class="post-card__title h4">
//       {{ post.data.title }}
//     </a>

//     <p class="post-card__excerpt">
//       {% excerpt post %} <span class="post-card__read-more">Read More</span>
//     </p>
//   </div>
// </article>

