import Router from './Router';
import {PageContainer} from "./layout/PageContainer";


function App() {
    return (
        <div className="App">
            <PageContainer>
                <Router/>
            </PageContainer>
        </div>
    );
}

export default App;
