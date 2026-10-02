import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Pet,
  type PetProps,
} from "@/domain/adoption/enterprise/entities/pet.js";
import { EnergyLevels } from "@/domain/adoption/enterprise/entities/enums/pet-energy-levels.js";
import { IndependenceLevels } from "@/domain/adoption/enterprise/entities/enums/pet-independence-levels.js";
import { SuitableEnvironments } from "@/domain/adoption/enterprise/entities/enums/pet-suitable-environments.js";
import { PetSize } from "@/domain/adoption/enterprise/entities/enums/pet-size.js";

import { faker } from "@faker-js/faker";

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityId) {
  const pet = Pet.create(
    {
      organizationId: new UniqueEntityId("organization-01"),
      name: "Leko",
      about: faker.lorem.sentence(4),
      age: 0.6,
      petSize: PetSize.LITTLE_PUPPY,
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

  return pet;
}
