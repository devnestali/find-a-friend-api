import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Dog,
  type DogProps,
} from "@/domain/adoption/enterprise/entities/dog.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/dog-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/dog-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/dog-suitable-environments.js";
import { DogSize } from "@/domain/adoption/enterprise/entities/enums/dog-size.js";

import { faker } from "@faker-js/faker";

export function makeDog(override: Partial<DogProps> = {}, id?: UniqueEntityId) {
  const dog = Dog.create(
    {
      organizationId: new UniqueEntityId("organization-01"),
      name: "Leko",
      about: faker.lorem.sentence(4),
      age: 0.6,
      dogSize: DogSize.LITTLE_PUPPY,
      energyLevel: EnergyLevels.VERY_HIGH,
      independenceLevel: IndependenceLevels.MEDIUM,
      suitableEnvironment: SuitableEnvironments.APARTMENT,
      photos: ["photo-link-01", "photo-link-02"],
      adoptionRequirements: [
        faker.lorem.sentence(3),
        faker.lorem.sentence(2),
        faker.lorem.sentence(5),
      ],
      latitude: faker.number.int(),
      longitude: faker.number.int(),
      ...override,
    },
    id,
  );

  return dog;
}
