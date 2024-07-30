import { createSelector } from "@ngrx/store"

export const selectDevolutionFeature = (state: any) => state.devolution

export const selectDevolution = createSelector(
    selectDevolutionFeature,
    (state: any) => state.devolution
)
export const selectDevolutions = createSelector(
    selectDevolutionFeature,
    (state: any) => state.devolutions
)
export const selectDevolutionsLoading = createSelector(
    selectDevolutionFeature,
    (state: any) => state.loading
)
export const selectDevolutionAdded = createSelector(
    selectDevolutionFeature,
    (state: any) => state.added
)
export const selectDevolutionDeleted = createSelector(
    selectDevolutionFeature,
    (state: any) => state.deleted
)