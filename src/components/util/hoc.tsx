import * as React from 'react'

interface Props {}
interface State {
  comments: Comment[]
}

interface Comment {
  id: number
  text: string
}

const DataSource = {
  getComments(): Comment[] {
    return [
      {
        id: 0,
        text: 'hi',
      },
      {
        id: 1,
        text: 'hello',
      },
    ]
  },
  addChangeListener(func: () => void) {},
  removeChangeListener(func: () => void) {},
}

class CommentList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      comments: DataSource.getComments(),
    }
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange)
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange)
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments(),
    })
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => <Comment comment={comment} key={comment.id} />)}
      </div>
    )
  }
}

class Comment extends React.Component<{ comment: Comment }, {}> {
  render() {
    return (
      <div>
        id: {this.props.comment.id}, text: {this.props.comment.text}.
      </div>
    )
  }
}
