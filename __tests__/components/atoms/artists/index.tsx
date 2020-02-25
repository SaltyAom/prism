import Artist from 'components/atoms/artist'

import { applyTheme, a, applyAdaptive } from 'libs/test'

describe('Feature: Artists (Atomic Component)', () => {
    let white = 'color:var(--light-text)',
        black = 'color:var(--dark-text)',
        text = "style"

    it('is in light theme', () => {
        // Given
        let theme = applyTheme(<Artist />, { isLight: true }).find(
            '#music-artist'
        )

        // When
        // appear

        // Then
        expect(a(theme, text)).toBe(black)
    })

    it('is in dark theme', () => {
        // Given
        let theme = applyTheme(<Artist />, { isLight: false }).find(
            '#music-artist'
        )

        // When
        // appear

        // Then
        expect(a(theme, text)).toBe(white)
    })


    // it('is theme-adaptive.', () => {
    //     // Given
    //     let artist = applyAdaptive(<Artist />).find(
    //         '#music-artist'
    //     )

    //     // When
    //     store.set('isLight', true)

    //     // Then
    //     expect(an(artist, text)).toBe(black)
    // })
})
