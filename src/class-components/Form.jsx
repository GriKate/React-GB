import React from 'react'

export class Form extends React.Component {
    state = {
        name: 'gb', 
        arr: ['ivanov', 'petrov', 'sidorov']
    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            {this.state.arr.map((item, idx) => {
                return <div key={idx}>{item}</div>
            })}
            <input type="text" onChange={this.handleChangeName} />
            <button>send form</button>
        </form>;
    }
}