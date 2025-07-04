from stable_baselines3 import PPO

class PPOAllocator:
    def __init__(self, env):
        self.model = PPO('MlpPolicy', env, verbose=1)

    def train(self, timesteps=10000):
        self.model.learn(total_timesteps=timesteps)

    def predict(self, obs):
        return self.model.predict(obs) 