import React from 'react'
import { shallow } from 'enzyme'
import { songIndexLookUp } from '../../app/utils/helpers'

import musicPlylist from '../../app/playlist';
import playList from '../../app/components/media/mediaComponents/PlayListComponent'
import song from "../components/mock/song_data_model"

import { assert, expect, should } from 'chai';
import PlayList from '../../app/components/media/mediaComponents/PlayListComponent';

// Enzyme render test docs: https://airbnb.io/enzyme/docs/api
describe('playList', () => {
    it('make sure playlist is not empty', () => {
        should().exist(musicPlylist)
    })


    it('make sure numerical value is return', () => {
        const index = songIndexLookUp(song)
        expect(index).to.be.a('number')
    })

})
