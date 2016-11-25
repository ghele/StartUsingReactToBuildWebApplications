import React from 'react';
import ReactDOM from 'react-dom';

( function ( ) {
  'use strict';

  var Quiz = React.createClass( {
    propTypes: {
      books: React.PropTypes.array.isRequired
    },
    getInitialState: function ( ) {
      return _.extend( {
        bgClass: 'neutral',
        showContinue: false
      }, this.props.data.selectGame( ) );
    },
    handleBookSelected: function ( title ) {
      var isCorrect = this.state.checkAnswer(title);
      this.setState ( {
        bgClass: isCorrect ? 'pass' : 'fail',
        showContinue: isCorrect
      } );
    },
    handleContinue: function () {
      this.setState(this.getInitialState());
    },
    render: function ( ) {
      return (
        <div>
          <div className="row">
            <div className="col-md-4">
              <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
            </div>
            <div className="col-md-7">
              {this.state.books.map( function ( b ) {
                return <Book onBookSelected={this.handleBookSelected} title={b} />
              }, this ) }
            </div>
            <div className={"col-md-1 " + this.state.bgClass}></div>
          </div>
          {this.state.showContinue ? (
            <div className="row">
              <div className="col-md-12">
                <input onClick={this.handleContinue} type="button" value="Continue" className="btn btn-default"/>
              </div>
            </div>) : <span/>
          }
        </div>
        );
    }
  } );

  var Book = React.createClass ( {
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    handleClick: function ( ) {
      this.props.onBookSelected(this.props.title);
    },
    render: function ( ) {
      return (
        <div onClick={this.handleClick} className="answer">
          <h4>{this.props.title}</h4>
        </div>
      );
    }
  } )

  var data = [
    {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      books: ['The Adventures of Huckleberry Finn']
    },
    {
      name: 'Joseph Conrad',
      imageUrl: 'images/authors/josephconrad.jpg',
      books: ['Heart of Darkness']
    },
    {
      name: 'J. K. Rowling',
      imageUrl: 'images/authors/jkrowling.jpg',
      imageSourse: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerers Stone']
    },
    {
      name: 'Stephen King',
      imageUrl: 'images/authors/stephenking.jpg',
      imageSourse: 'Wikimedia Commons',
      imageAttribution: 'Pinguino',
      books: ['The Shining', 'IT']
    },
    {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSourse: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
      name: 'William Shakespeare',
      imageUrl: 'images/authors/williamshakespeare.jpg',
      imageSourse: 'Wikimedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
  ];

  data.selectGame = function ( ) {
    var books = _.shuffle(this.reduce( function ( p, c, i ) {
      return p.concat(c.books);
    }, [ ] ) ). slice(0, 4);

    var answer = books[_.random(books.length - 1)];

    return {
      books: books,
      author: _.find(this, function ( author ) {
          return author.books.some( function ( title) {
            return title === answer;
          });
      }),
      checkAnswer: function ( title ) {
        return this.author.books.some( function ( t ) {
          return t === title;
        } )
      }
    };
  };

  ReactDOM.render(
    <Quiz data={data} />,
    document.getElementById('app')
  );

} ) ( );

// var App = React.createClass ( {
//   render: function ( ) {
//     return (
//       <div>
//         <h1>Hello at {this.props.now}</h1>
//       </div>
//     );
//   }
// } )

// class App extends React.Component {
//   constructor ( ) {
//     super ( )
//     this.state = {
//       input: '/* add your jsx here */',
//       output: '',
//       err: ''
//     }
//     this.update = this.update.bind(this);
//   }
//   update ( e ) {
//     let code = e.target.value;
//     try {
//         this.setState ( {
//           output: babel.transform( code, {
//               stage: 0,
//               loose: 'all'
//           } ).code,
//           err: ''
//         } )
//     }
//     catch (err) {
//       this.setState ( { err: err.message } )
//     }
//   }
//   render ( ) {
//     return (
//       <div>
//         <header>{this.state.err}</header>
//         <div className="container">
//           <textarea
//             onChange={this.update}
//             defaultValue={this.state.input} >
//           </textarea>
//           <pre>
//             {this.state.output}
//           </pre>
//         </div>
//       </div>
//     );
//   }
// }



// let Mixin = InnerComponent => class extends React.Component {
//   constructor() {
//     super();
//     this.update = this.update.bind(this);
//     this.state = { val: 0};
//   }
//   update() {
//     this.setState( { val: this.state.val + 1 } )
//   }
//   componentWillMount ( ) {
//     console.log('will mount');
//   }
//   render() {
//     return <InnerComponent
//       update={this.update}
//       {...this.state}
//       {...this.props} />
//   }
//   componentDidMount ( ) {
//     console.log('mounted');
//   }
// }

// const Button = (props) => <button
//                             onClick={props.update}>
//                             {props.txt} - {props.val}
//                           </button>
// const Label = (props) => <button
//                             onMouseMove={props.update}>
//                             {props.txt} - {props.val}
//                           </button>
//
// let ButtonMixed = Mixin(Button)
// let LabelMixed = Mixin(Label)

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <ButtonMixed txt="Button" />
//         <LabelMixed txt="Label" />
//       </div>
//     );
//   }
// }

// App.defaultProps = { txt: 'button' }

  // componentDidMount() {
  //   console.log("mounted");
  //   console.log(ReactDOM.findDOMNode(this));
  //   this.inc = setInterval(this.update, 500)
  // }
  // componentWillUnmount() {
  //   console.log("bye!");
  //   clearInterval(this.inc);
  // }

// class Wrapper extends React.Component {
//   constructor( ) {
//     super( );
//   }
//   mount( ) {
//     ReactDOM.render(<App />, document.getElementById('a') )
//   }
//   unmount( ) {
//     ReactDOM.unmountComponentAtNode(document.getElementById('a') )
//   }
//   render( ) {
//     return (
//       <div>
//         <button onClick={this.mount.bind(this)}>Mount</button>
//         <button onClick={this.unmount.bind(this)}>Unmount</button>
//         <div id="a"></div>
//       </div>
//     );
//   }
// }
// export default Wrapper;
// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       red: 0
//     }
//     this.update = this.update.bind(this)
//   }
//   update(e) {
//     this.setState( {
//       red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
//     } )
//   }
//
//   render() {
//     return (
//       <div>
//         <NumInput
//           ref="red"
//           min={0}
//           max={255}
//           step={1}
//           val={+this.state.red}
//           type="number"
//           label="Red"
//           update={this.update} />
//       </div>
//     );  // React.createElement(...);
//   }
// }

// class Button extends React.Component {
//   render() {
//     return <button>{this.props.children}</button>
//   }
// }

// class NumInput extends React.Component {
//   render() {
//     let label = this.props.label !== '' ?
//       <label>{this.props.label} - {this.props.val}</label> : ''
//     return (
//       <div>
//         <input ref="inp"
//           type={this.props.type}
//           min={this.props.min}
//           max={this.props.max}
//           step={this.props.step}
//           defaultValue={this.props.val}
//           onChange={this.props.update} />
//           {label}
//       </div>
//     );
//   }
// }

// const Heart = () => <span className="glyphicon glyphicon-heart"></span>
// const App = () => <h1>Hello Rargoul!</h1>  // does not have state

// NumInput.propTypes = {
//   min: React.PropTypes.number,
//   max: React.PropTypes.number,
//   step: React.PropTypes.number,
//   val: React.PropTypes.number,
//   label: React.PropTypes.string,
//   update: React.PropTypes.func.isRequired,
//   type: React.PropTypes.oneOf([ 'number', 'range' ])
// }

// NumInput.defaultProps = {
//   min: 0,
//   max: 0,
//   step: 1,
//   val: 0,
//   label:'',
//   type: 'range'
// }

// class App extends React.Component {
//   constructor( ) {
//     super( );
//     this.state = { data: [
//       { id: 1, name: "Simon Bailey" }, { id: 2, name: "Thomas Burleson" },
//       { id: 3, name: "Will Button" }, { id: 4, name: "Ben Clinkinbears" },
//       { id: 5, name: "Kent Dodds" }, { id: 6, name: "Trever Ewen" },
//       { id: 7, name: "Aaron Frost" }, { id: 8, name: "Joel Hooks" },
//       { id: 9, name: "Jafar Husain" }, { id: 10, name: "Tim Kindberg" },
//       { id: 11, name: "John Lindquist" }, { id: 12, name: "Joe Maddalone" },
//       { id: 13, name: "Tyler McGinnis" }, { id: 14, name: "Scot Moss" },
//       { id: 15, name: "Robert Penner" }, { id: 16, name: "Keith Peters" },
//       { id: 17, name: "Lukas Ruebbelke" }, { id: 18, name: "Brett Shollenberger" }
//     ] }
//   }
//   render() {
//     let rows = this.state.data.map( person => {
//       return <PersonRow key={person.id} data={person} />
//     } )
//     return <table>
//             <tbody>{rows}</tbody>
//            </table>
//   }
// }
//
// const PersonRow = ( props ) => {
//   return <tr>
//           <td>{props.data.id}</td>
//           <td>{props.data.name}</td>
//          </tr>
// }
//
//
