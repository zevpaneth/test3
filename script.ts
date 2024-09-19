let rangeFieldValue = document.querySelector('#rangeFieldValue') as HTMLSpanElement
const fieldGoalRange = document.querySelector('#fieldGoalRange') as HTMLInputElement
let rangePointsValue = document.querySelector('#rangePointsValue') as HTMLSpanElement
const rangePoints = document.querySelector('#pointsRange') as HTMLInputElement
let range3PointValue = document.querySelector('#range3PointValue') as HTMLSpanElement
const point3Range = document.querySelector('#Point3Range') as HTMLInputElement

fieldGoalRange.addEventListener('input', (e) => {
    rangeFieldValue.textContent = fieldGoalRange.value
})
rangePoints.addEventListener('input', (e) => {
    rangePointsValue.textContent = rangePoints.value
})
point3Range.addEventListener('input', (e) => {
    range3PointValue.textContent = point3Range.value
})

