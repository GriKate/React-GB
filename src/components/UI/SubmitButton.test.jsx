import React from 'react'
import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
    it('render SubmitButton component', () => {
        render (<SubmitButton>Send message</SubmitButton>)
    })
})