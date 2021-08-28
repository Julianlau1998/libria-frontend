export function POST_REPORT (state) {
  state.report.submitting = true
}
export function REPORT_POSTED (state) {
  state.report.submitting = false
}