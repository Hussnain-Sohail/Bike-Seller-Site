import { Link } from 'react-router-dom';

function Aboutus() {
    return (
        <div>
            <h1>Welcome to Bikes</h1>
            <h2>What we provide</h2>
            <p>Bikes is a free to use platform that connects different users together to sell and buy bikes based upon there needs</p>
            <p>Bikes is completely free to use and anybody can create their Account and sell and buy used bikes</p>
            <p>Welcome to the easiest way to buy and sell bikes online. Create a free account in seconds to browse listings, connect with buyers and sellers, and manage your bikes all in one place. Whether you're looking for your next ride or ready to sell your current bike, our platform provides a simple, secure, and completely free marketplace for bike enthusiasts. No subscription fees, no hidden charges—just a community-driven platform built to help you find great deals and reach more people.
            </p>
            <p>Find your perfect ride or sell your bike with ease. Join our free marketplace today to create an account, list bikes, browse available models, and connect with other riders. With no listing fees and no hidden costs, buying and selling bikes has never been simpler. Start exploring, trading, and riding—all completely free.
            </p>
            <h2>More about</h2>
            <p>At our core, we believe buying and selling bikes should be simple, accessible, and affordable for everyone. Our platform was created to bring riders, enthusiasts, collectors, and everyday commuters together in one convenient online marketplace where they can confidently connect and trade bikes. Whether you're searching for your first motorcycle, upgrading to a newer model, or looking to sell a bike you no longer use, we provide the tools and space to make the process as smooth as possible. Users can create free accounts, manage their listings, explore available bikes, and communicate with potential buyers or sellers without worrying about subscription costs or hidden fees.</p>
            <p>ur mission is to build a trusted community where quality bikes can easily find new owners. We understand that purchasing a bike is an important decision, which is why we strive to make browsing and comparing listings straightforward and transparent. Sellers can showcase their bikes with detailed information and images, helping buyers make informed choices, while buyers gain access to a growing collection of bikes from different brands, styles, and price ranges. By keeping the platform completely free, we aim to remove barriers and create opportunities for more people to participate in the marketplace. As our community grows, we remain committed to providing a reliable, user-friendly experience that helps connect riders and keeps the passion for biking moving forward.</p>
            <Link to='/'>
                <button className='button'>Go to Sign In page</button>
            </Link>
        </div>
    );
}

export default Aboutus