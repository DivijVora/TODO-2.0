import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function addExampleLists() {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const client = new MongoClient(mongoUri);

    try {
        await client.connect();
        const db = client.db('todoapp');
        
        // Two example lists
        const lists = [
            {
                title: "Work Tasks",
                user_id: new ObjectId("68ff80b8f199f2bbc05999ec"),
                list: [
                    {
                        id: 1,
                        task: "Complete project proposal",
                        completed: false,
                        due_date: "2025-10-30",
                        due_time: "15:00",
                        starred: true,
                        priority: 1
                    },
                    {
                        id: 2,
                        task: "Team meeting",
                        completed: false,
                        due_date: "2025-10-29",
                        due_time: "10:00",
                        starred: false,
                        priority: 2
                    },
                    {
                        id: 3,
                        task: "Review pull requests",
                        completed: false,
                        starred: false,
                        priority: 3
                    }
                ]
            },
            {
                title: "Personal Tasks",
                user_id: new ObjectId("68ff80b8f199f2bbc05999ec"),
                list: [
                    {
                        id: 1,
                        task: "Grocery shopping",
                        completed: false,
                        starred: false,
                        priority: 2
                    },
                    {
                        id: 2,
                        task: "Gym workout",
                        completed: false,
                        due_date: "2025-10-28",
                        due_time: "18:00",
                        starred: true,
                        priority: 2
                    },
                    {
                        id: 3,
                        task: "Call mom",
                        completed: false,
                        starred: true,
                        priority: 1
                    }
                ]
            }
        ];

        // Insert the lists
        const result = await db.collection('lists').insertMany(lists);
        console.log('Added example lists:', result.insertedIds);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

addExampleLists();