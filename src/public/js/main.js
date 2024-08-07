const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// more reviews
handleReviews = () => {
    const moreReviews = $('.more-reviews');
    const reviewsString = moreReviews.getAttribute('data-reviews');
    // Convert reviewsString to an array
    const reviews = JSON.parse(reviewsString);
    const templateCode = `
    <% if (reviews.length > 0) { %>
      <% reviews.forEach(review => { %>
        <% const user = review.userId; %>
        <% tour = review.tourId %>
        <div class="horizontalLine"></div>
        <div class="review-detail pt-4 pb-4">
            <div class="row">
                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-2">
                    <div class="row">
                        <div class="col-xs-12 vspacing3 customerReviewName">
                            <img width="50px" height="50px" src="<%= user.avatar %>" alt="avatar" />
                            <span><%= user.username %></span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-10">
                    <div class="row">
                        <div class="col-xs-12 mb-3">
                            <span class="scoreSpan"><%= review.rating %></span>
                            <span class="scoreReviewDate"><%= review.updatedAt %></span>
                        </div>
                        <div class="col-xs-12">
                            <span class="customerReviewContent"> <%= review.comment %> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <% }) %>
    <% } else { %>
      <div class="col-xs-12">
          <p>Không có đánh giá nào cho tour này.</p>
      </div>
    <% } %>
  `;
    // Compile the template
    const compiledTemplate = ejs.compile(templateCode);
    // Render the template with data
    const renderedHTML = compiledTemplate({ reviews });
    // Insert the rendered HTML into the DOM
    const reviewsContainer = $('.review-detail-container');
    reviewsContainer.innerHTML = renderedHTML;
    moreReviews.style.display = 'none';
};
