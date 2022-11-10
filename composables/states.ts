export const useSearchKey = () => useState('search-key', () => '')
export const useAccessToken = () => useState('access-token', () => useCookie('access-token'))
export const useIsAuthorized = () => useState('is-authorized', () => false)
