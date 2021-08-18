export function GET_COMMENTS (state) {
  state.comments.loading = true
  state.err = null
}

export function RECEIVE_COMMENTS(state, comments) {
  state.comments.data = comments
  state.comments.loading = false
}

export function GET_COMMENT (state) {
  state.comment.loading = true
  state.err = null
}

export function RECEIVE_COMMENT (state, comment) {
  state.comment.data = comment
  state.comment.loading = false
}

export function POST_COMMENT (state) {
  state.comment.submitting = true
  state.err = null
}
export function COMMENT_POSTED (state, comment) {
  state.comments.data.unshift(comment)
  state.comment.submitting = false
}
export function DELETE_COMMENT (state, commentId) {
  state.comments.data = state.comments.data.filter(el => el.id !== commentId)
  state.comment.loading = true
  state.err = null
}
export function COMMENT_DELETED (state) {
  state.comment.loading = false
}
export function PUT_COMMENT (state) {
  state.comment.submitting = true
  state.err = null
}
export function COMMENT_PUT (state) {
  state.comment.submitting = false
}
