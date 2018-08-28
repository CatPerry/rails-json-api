import React, { Component } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Dimmer,
  Loader,
  Divider
} from "semantic-ui-react";


class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getArticles = this.getArticles.bind(this)
    this.getArticle = this.getArticle.bind(this);
  }

  componentWillMount () {
    this.getArticles()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
    .then(response => response.json())
    .catch(error => console.log(error))
  }

  getArticles () {
    this.fetch('/api/articles')
      .then(articles => {
        if (articles.length) {
          this.setState({articles: articles})
          this.getArticle(articles[0].id)
        } else {
          this.setState({articles: []})
        }
      })
  }

  getArticle (id) {
    this.fetch(`/api/articles/${id}`)
      .then(article => this.setState({article: article}))
  }

  render() {
    let { articles, article } = this.state
    return articles
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            List of Books
          </Header.Content>
        </Header>
        <Divider hidden section />
        {articles && articles.length
          ? <Button.Group color='teal' fluid widths={articles.length}>
            {Object.keys(articles).map((key) => {
              return <Button active={article && article.id === articles[key].id} fluid key={key} onClick={() => this.getArticle(articles[key].id)}>
                {articles[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No articles found.</Container>
        }
        <Divider section />
        {article &&
          <Container>
            <Header as='h2'>{article.title}</Header>
            {article.body && <p>{article.body}</p>}
            
          </Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App





  // componentDidMount() {
  //   window
  //     .fetch("/api/articles")
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.log(error));
  // }
  // componentDidMount() {
  //   fetch(`/api/v1/articles`, {
  //     credentials: "same-origin",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     method: "GET"
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         title: data.article.title
  //       });
  //     });
  // }
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;