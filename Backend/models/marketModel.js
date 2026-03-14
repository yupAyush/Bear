const mongoose = require ('mongoose');

const marketSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'closed', 'resolved', 'cancelled'],
      default: 'draft',
    },
    outcomes: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length >= 2; 
            },
            message: 'A market must have at least two outcomes.'
        }
    },
    q: {
        type: [Float16Array],
        required: true,
        validate: {
            validator: function(value) {
                return value.length === this.outcomes.length;
            },
        }
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    volume: {
        type: Float16Array,
        default: function() {
            return this.b *Math.log(this.outcomes.length);
            
        }
    },
    //liquidity factor
    b: {
        type: Float16Array,
        default: 100.00,
    },
    });

const Market = mongoose.model('Market', marketSchema);