import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import serverless from "serverless-http"


const api = express()

api.use(cors())
api.use(bodyParser.json())


// Connect Database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error)
    })

// Create Models and Schemas
const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    lastLogin: {
        type: Date,
        required: true
    }
})
const User = mongoose.model('user', userSchema)

const fruitSchema = new mongoose.Schema({
    name: String,
    type: String,
    character: String,
    abilities: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
})
const Fruit = mongoose.model('fruit', fruitSchema)

const reviewSchema = new mongoose.Schema({
    fruit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fruit',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: String
})

const Review = mongoose.model('review', reviewSchema);

const router = Router()


// Define backend routes //
router.get('/', async (req, res) => {
    try {
        res.json({
            message: 'Hello fruit'
        })
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500).json({ error: 'Page not loading' })
    }
})
// Route to home page
router.get('/fruits', async (req, res) => {
    try {
        const fruits = await Fruit.find() // Fetch all fruits from the database
        res.status(200).json({ fruits })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Route to search fruits
router.get('/fruits/list', async (req, res) => {
    try {
        const fruitList = await Fruit.find({})
        res.status(200).json(fruitList)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Route to single fruit view
router.get('/fruits/:id', async (req, res) => {
    try {
        const fruitId = req.params.id
        const fruit = await Fruit.findById(fruitId)

        if (!fruit) {
            return res.status(404).json({ error: 'Fruit not found' })
        }

        res.status(200).json(fruit)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


// Add New Devil Fruit
router.post('/fruits/add', async (req, res) => {
    try {
        console.log(req.body)
        // Check if the fruit already exists in the database
        const existingFruit = await Fruit.findOne({ name: req.body.name });

        if (existingFruit) {
            console.log('Devil Fruit is already in the collection');
            res.status(400).json({ error: 'Devil Fruit already exists' });
            return; // Exit the route handler
        }

        // Find the user by their email 
        const user = await User.findOne({ userEmail: req.body.user });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new Devil Fruit document and associate it with the user
        const newFruit = new Fruit({
            name: req.body.name,
            type: req.body.type,
            character: req.body.character,
            abilities: req.body.abilities,
            user: user._id, // Assign the user's ID
        });

        await newFruit.save();
        console.log('New Devil Fruit added:', newFruit);
        res.status(201).json(newFruit); // Return the new Devil Fruit with a 201 status (Created)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add Devil Fruit' });
    }
});



// Edit Fruit
router.put('/fruits/update/:id', async (req, res) => {
    const fruitId = req.params.id;
    console.log(req.body.loggedInUser)
    const fruitData = await Fruit.findOne({ name: req.body.name })
    if (fruitData) {
        console.log(fruitData.user)
    }
    // compare the loggedin user with the user that created the fruit
    // if they are not the same, throw an error saying this user is not authorised to edit this fruit, else update the fruit

    try {
        const updatedFruit = await Fruit.findByIdAndUpdate(
            fruitId,
            {
                name: req.body.name,
                type: req.body.type,
                character: req.body.character,
                user: req.body.user,

                abilities: req.body.abilities,
            },
            { new: true }
        )

        if (!updatedFruit) {
            return res.status(404).json({ error: 'Fruit not found' })
        }

        res.json({ message: 'Fruit has been updated', updatedFruit })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/fruits/:id', async (req, res) => {
    try {
        const fruitId = req.params.id
        const deletedFruit = await Fruit.findByIdAndRemove(fruitId)

        if (!deletedFruit) {
            return res.status(404).json({ error: 'Fruit not found' })
        }

        res.status(200).json({ message: 'Fruit has been deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})




//* Endpoints to attributes

router.get('/fruits/type/paramecia', async (req, res) => {
    try {
        const parameciaFruits = await Fruit.find({ type: 'Paramecia' })

        res.status(200).json(parameciaFruits)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Route to fetch Logia types
router.get('/fruits/type/logia', async (req, res) => {
    try {
        const logiaFruits = await Fruit.find({ type: 'Logia' })

        res.status(200).json(logiaFruits)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Route to fetch Zoan types
router.get('/fruits/type/zoan', async (req, res) => {
    try {
        const zoanFruits = await Fruit.find({ type: 'Zoan' })

        res.status(200).json(zoanFruits)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Route to add a review
router.post('/fruits/:fruitId/reviews/add', async (req, res) => {
    try {
        const { fruitId, rating, comment } = req.body;
        const newReview = new Review({ fruit: fruitId, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});



// Route to fetch reviews for a specific fruit
router.get('/fruits/:fruitId/reviews', async (req, res) => {
    try {
        const fruitId = req.params.fruitId;
        const reviews = await Review.find({ fruit: fruitId });
        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to list all reviews
router.get('/fruits/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User authentication
router.post('/user/login', async (req, res) => {
    const now = new Date()
    console.log(req.body.email)
    // check if user exists, then save the session
    // if the user does not exists create the user, then save the session
    // 
    const newUser = new User({ userEmail: req.body.email, lastLogin: now })
    console.log(newUser)
    newUser.save()
        .then((savedUser) => {
            const userId = savedUser._id; // Obtain the MongoDB-generated user ID

            // Set the 'user_session' cookie with the obtained user ID.
            const userSession = {
                userId: userId,
                // Other user session data
            };
            // find the correct way to acess the cookies
            const { cookies } = useCookies()
            cookies.set('user_session', userSession)

            res.sendStatus(200)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a new user' })
        })
})

api.use("/api/", router)
export const handler = serverless(api)



